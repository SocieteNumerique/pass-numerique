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

    public function findTerritoriesNames(int $scale, array $codes): iterable
    {
        if (!$codes) {
            return [];
        }

        if ($scale === 3) {
            $scale = 2;
        }

        $qb = $this->createQueryBuilder('s');
        $qb->select('s.name');
        $qb->where($qb->expr()->in('s.code', $codes));
        $qb->andWhere('s.scale = :scale')->setParameter('scale', $scale);

        return array_column($qb->getQuery()->getArrayResult(), 'name');
    }
}
