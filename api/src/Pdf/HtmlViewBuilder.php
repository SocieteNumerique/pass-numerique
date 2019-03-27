<?php

namespace App\Pdf;

use App\Repository\AreaStatsRepository;
use Symfony\Component\Filesystem\Filesystem;
use Twig\Environment;

class HtmlViewBuilder
{
    private $cacheDir;
    private $repository;
    private $twig;

    public function __construct(string $cacheDir, AreaStatsRepository $repository, Environment $twig)
    {
        $this->cacheDir = $cacheDir;
        $this->repository = $repository;
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

        $codes = array_map('trim', explode(',', $data['territory']));
        $territories = $this->repository->findTerritoriesNames($data['scale'], $codes);

        // Build the HTML file
        $fs->dumpFile($filename, $this->twig->render('pdf.html.twig', ['data' => $data, 'territories' => $territories]));

        return $filename;
    }

    public function clean()
    {
        $fs = new Filesystem();
        $fs->remove($this->cacheDir.'/pdf');
    }
}
