﻿// <auto-generated />
using System;
using AlbumAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace AlbumAPI.API.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20230921133511_UserProfile")]
    partial class UserProfile
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("AlbumAPI.Models.Album", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("ID"));

                    b.Property<string>("AlbumDescription")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("AlbumName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("AlbumType")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("ArtistName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("DateAdded")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("PhotoURL")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("ReleaseDate")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("SpotifyID")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int?>("UserID")
                        .HasColumnType("integer");

                    b.Property<bool>("isPrivate")
                        .HasColumnType("boolean");

                    b.HasKey("ID");

                    b.HasIndex("UserID");

                    b.ToTable("Albums");
                });

            modelBuilder.Entity("AlbumAPI.Models.User", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("ID"));

                    b.Property<DateTime>("Created")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<byte[]>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("bytea");

                    b.Property<byte[]>("PasswordSalt")
                        .IsRequired()
                        .HasColumnType("bytea");

                    b.Property<string>("ProfilePhotoID")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("ProfilePhotoURL")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("RefreshToken")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("RefreshTokenExpiration")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("VerificationToken")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime?>("VerifiedAt")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("ID");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("AlbumAPI.Models.Album", b =>
                {
                    b.HasOne("AlbumAPI.Models.User", "User")
                        .WithMany("Albums")
                        .HasForeignKey("UserID");

                    b.Navigation("User");
                });

            modelBuilder.Entity("AlbumAPI.Models.User", b =>
                {
                    b.Navigation("Albums");
                });
#pragma warning restore 612, 618
        }
    }
}
