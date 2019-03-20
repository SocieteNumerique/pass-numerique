<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource(
 *     collectionOperations={"get"},
 *     itemOperations={"get"}
 * )
 * @ApiFilter(SearchFilter::class, properties={"scale": "exact", "code": "partial"})
 *
 * @ORM\Table(name="areas_stats")
 * @ORM\Entity(repositoryClass="App\Repository\AreaStatsRepository")
 */
class AreaStats
{
    public const SCALE_INTERMUNICIPAL = 1;
    public const SCALE_DEPARTMENTAL = 2;
    public const SCALE_INTERDEPARTMENTAL = 3;
    public const SCALE_REGIONAL = 4;

    /**
     * @var int|null
     *
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="bigint")
     */
    private $id;

    /**
     * @var int|null
     *
     * @ORM\Column(type="smallint")
     */
    private $scale;

    /**
     * @var string|null
     *
     * @ORM\Column(length=50)
     */
    private $code;

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

    public function __construct(?int $scale, ?string $code, ?string $name, ?float $population, ?float $density, ?float $poverty)
    {
        $this->scale = $scale;
        $this->code = $code;
        $this->name = $name;
        $this->population = $population;
        $this->density = $density;
        $this->poverty = $poverty;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getScale(): ?int
    {
        return $this->scale;
    }

    public function setScale(?int $scale)
    {
        $this->scale = $scale;
    }

    public function getCode(): ?string
    {
        return $this->code;
    }

    public function setCode(?string $code)
    {
        $this->code = $code;
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
