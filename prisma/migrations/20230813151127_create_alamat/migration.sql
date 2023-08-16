-- CreateTable
CREATE TABLE `alamat` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_jalan` VARCHAR(100) NOT NULL,
    `no_rumah` VARCHAR(100) NULL,
    `desa` VARCHAR(100) NOT NULL,
    `kecamatan` VARCHAR(100) NOT NULL,
    `siswa_id` INTEGER NOT NULL,

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- AddForeignKey
ALTER TABLE `alamat` ADD CONSTRAINT `alamat_siswa_id_fkey` FOREIGN KEY (`siswa_id`) REFERENCES `siswa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
