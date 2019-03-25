<?php

namespace App\Pdf;

use GuzzleHttp\ClientInterface;
use Symfony\Component\HttpFoundation\Response;

class PdfRequestHandler
{
    private $viewBuilder;
    private $httpClient;

    public function __construct(HtmlViewBuilder $viewBuilder, ClientInterface $httpClient)
    {
        $this->viewBuilder = $viewBuilder;
        $this->httpClient = $httpClient;
    }

    public function createPdfResponse(array $data): Response
    {
        try {
            $viewFilename = $this->viewBuilder->createHtmlViewFile($data);

            $response = $this->httpClient->request('POST', 'http://pdf:3000/convert/html', [
                'multipart' => [[
                    'name'     => 'files',
                    'contents' => fopen($viewFilename, 'rb'),
                ]],
            ]);
        } finally {
            $this->viewBuilder->clean();
        }

        return new Response($response->getBody()->getContents(), 200, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'inline; filename=simulation-pass-numeriques.pdf',
        ]);
    }
}
