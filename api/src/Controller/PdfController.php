<?php

namespace App\Controller;

use App\Pdf\PdfRequestHandler;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class PdfController extends AbstractController
{
    /**
     * @Route("/pdf", name="pdf_preview")
     */
    public function preview(PdfRequestHandler $pdfRequestHandler, Request $request)
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

        return $pdfRequestHandler->createPdfResponse($data);
    }
}
