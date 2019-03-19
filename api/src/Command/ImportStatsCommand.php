<?php

namespace App\Command;

use App\Entity\AreaStats;
use Doctrine\ORM\EntityManagerInterface;
use League\Csv\Reader;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class ImportStatsCommand extends Command
{
    protected static $defaultName = 'app:import-stats';

    private $manager;

    public function __construct(EntityManagerInterface $manager)
    {
        parent::__construct();

        $this->manager = $manager;
    }

    protected function configure()
    {
        $this->setDescription('Import INSEE statistics in the database.');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $toImport = [
            1 => __DIR__.'/../Resources/data/intermunicipal.csv',
            2 => __DIR__.'/../Resources/data/departemental.csv',
            4 => __DIR__.'/../Resources/data/regional.csv',
        ];

        $output->writeln('Starting import ...');

        $output->writeln('    Clearing previous data ...');
        $this->manager->getRepository(AreaStats::class)->clearAll();

        foreach ($toImport as $codePrefix => $filename) {
            $output->write('    Importing '.$filename.' ... ');

            $csv = Reader::createFromPath($filename);
            $csv->setDelimiter(',');
            $csv->setHeaderOffset(0);

            $imported = 0;
            foreach ($csv->getRecords() as $record) {
                $code = trim($record['Code']);
                if (!$code) {
                    continue;
                }

                $population = $this->normalizeStat($record['Population légale 2016']);
                $density = $this->normalizeStat($record['Densité de population (historique depuis 1876) 2015']);
                $poverty = $this->normalizeStat($record['Taux de pauvreté 2015']);

                if (null === $population && null === $density && null === $poverty) {
                    continue;
                }

                $this->manager->persist(new AreaStats(
                    $codePrefix.'-'.$code,
                    trim($record['Libellé']),
                    $population,
                    $density,
                    $poverty
                ));

                $imported++;
            }

            $this->manager->flush();

            $output->writeln($imported.' records imported');
        }

        $output->writeln('Done');
    }

    private function normalizeStat(string $value): ?float
    {
        $value = str_replace(',', '', trim($value));

        return is_numeric($value) ? (float) $value : null;
    }
}
