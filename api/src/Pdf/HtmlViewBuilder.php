<?php

namespace App\Pdf;

use Symfony\Component\Filesystem\Filesystem;
use Twig\Environment;

class HtmlViewBuilder
{
    private $cacheDir;
    private $twig;

    public function __construct(string $cacheDir, Environment $twig)
    {
        $this->cacheDir = $cacheDir;
        $this->twig = $twig;
    }

    public function createHtmlViewFile(array $data): string
    {
        $pdfDir = $this->cacheDir.'/pdf/'.md5(uniqid('', true));

        $fs = new Filesystem();
        if (!file_exists($pdfDir)) {
            $fs->mkdir($pdfDir);
        }

        $filename = $pdfDir.'/index.html';

        // Build the HTML file
        $fs->dumpFile($filename, $this->twig->render('pdf.html.twig', ['data' => $data]));

        return $filename;
    }

    public function clean()
    {
        $fs = new Filesystem();
        $fs->remove($this->cacheDir.'/pdf');
    }
}
