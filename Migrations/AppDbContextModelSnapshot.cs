﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace EventoApi.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("Evento", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("DataEvento")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("LocalEvento")
                        .HasColumnType("longtext");

                    b.Property<string>("NomeEvento")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Evento");
                });

            modelBuilder.Entity("Ingresso", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("DataEmissao")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("NomeEvento")
                        .HasColumnType("longtext");

                    b.Property<string>("NomeParticipante")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Ingresso");
                });

            modelBuilder.Entity("Local", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("CapacidadeLocal")
                        .HasColumnType("int");

                    b.Property<string>("EnderecoLocal")
                        .HasColumnType("longtext");

                    b.Property<string>("NomeLocal")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Locais");
                });

            modelBuilder.Entity("Participante", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("CpfParticipante")
                        .HasColumnType("longtext");

                    b.Property<DateTime>("DataEmissao")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("NomeParticipante")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Participantes");
                });
#pragma warning restore 612, 618
        }
    }
}
