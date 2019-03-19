<?php

namespace App\Repository;

use App\Entity\AreaStats;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method AreaStats|null find($id, $lockMode = null, $lockVersion = null)
 * @method AreaStats|null findOneBy(array $criteria, array $orderBy = null)
 * @method AreaStats[]    findAll()
 * @method AreaStats[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AreaStatsRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, AreaStats::class);
    }

    public function clearAll()
    {
        $this->createQueryBuilder('s')->delete()->getQuery()->execute();
    }
}
