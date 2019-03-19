<?php

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20190319134316 extends AbstractMigration
{
    public function up(Schema $schema): void
    {
        $this->addSql('CREATE TABLE areas_stats (id VARCHAR(50) NOT NULL, name VARCHAR(100) DEFAULT NULL, population BIGINT DEFAULT NULL, density NUMERIC(6, 1) DEFAULT NULL, poverty NUMERIC(5, 2) DEFAULT NULL, PRIMARY KEY(id))');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('DROP TABLE areas_stats');
    }
}
