<?php

namespace App\Controller;

use GuzzleHttp\ClientInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class PdfController extends AbstractController
{
    /**
     * @Route("/pdf", name="pdf_preview")
     */
    public function preview(ClientInterface $client, Request $request)
    {
        if (!$request->query->get('payload')) {
            throw $this->createNotFoundException();
        }

        $data = @json_decode($request->query->get('payload'), true);
        if (!is_array($data)) {
            throw $this->createNotFoundException();
        }

        if ($request->query->has('preview')) {
            return $this->render('pdf.html.twig', ['data' => $data]);
        }

        $html = $this->renderView('pdf.html.twig', ['data' => $data]);
        file_put_contents(__DIR__.'/../../var/index.html', $html);

        $response = $client->request('POST', 'http://pdf:3000/convert/html', [
            'multipart' => [[
                'name'     => 'files',
                'contents' => fopen(__DIR__.'/../../var/index.html', 'rb'),
            ]],
        ]);
        return new Response($response->getBody()->getContents(), 200, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'inline; filename=simulation-pass-numeriques.pdf',
        ]);
    }
}
