<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource(
 *     collectionOperations={},
 *     itemOperations={"get"}
 * )
 *
 * @ORM\Table(name="areas_stats")
 * @ORM\Entity(repositoryClass="App\Repository\AreaStatsRepository")
 */
class AreaStats
{
    /**
     * @var string|null
     *
     * @ORM\Id()
     * @ORM\Column(length=50)
     */
    private $id;

    /**
     * @var string|null
     *
     * @ORM\Column(length=100, nullable=true)
     */
    private $name;

    /**
     * @var float|null
     *
     * @ORM\Column(type="bigint", nullable=true)
     */
    private $population;

    /**
     * @var float|null
     *
     * @ORM\Column(type="decimal", precision=6, scale=1, nullable=true)
     */
    private $density;

    /**
     * @var float|null
     *
     * @ORM\Column(type="decimal", precision=5, scale=2, nullable=true)
     */
    private $poverty;

    public function __construct(string $id, ?string $name, ?float $population, ?float $density, ?float $poverty)
    {
        $this->id = $id;
        $this->name = $name;
        $this->population = $population;
        $this->density = $density;
        $this->poverty = $poverty;
    }

    public function getId(): ?string
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name)
    {
        $this->name = $name;
    }

    public function getPopulation(): ?float
    {
        return $this->population;
    }

    public function setPopulation(?float $population)
    {
        $this->population = $population;
    }

    public function getDensity(): ?float
    {
        return $this->density;
    }

    public function setDensity(?float $density)
    {
        $this->density = $density;
    }

    public function getPoverty(): ?float
    {
        return $this->poverty;
    }

    public function setPoverty(?float $poverty)
    {
        $this->poverty = $poverty;
    }
}
