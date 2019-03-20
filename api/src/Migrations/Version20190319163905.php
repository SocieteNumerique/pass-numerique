<?php

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20190319163905 extends AbstractMigration
{
    public function up(Schema $schema): void
    {
        $this->addSql('CREATE SEQUENCE areas_stats_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE areas_stats (id BIGINT NOT NULL, scale SMALLINT NOT NULL, code VARCHAR(50) NOT NULL, name VARCHAR(100) DEFAULT NULL, population BIGINT DEFAULT NULL, density NUMERIC(6, 1) DEFAULT NULL, poverty NUMERIC(5, 2) DEFAULT NULL, PRIMARY KEY(id))');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('DROP SEQUENCE areas_stats_id_seq CASCADE');
        $this->addSql('DROP TABLE areas_stats');
    }
}
