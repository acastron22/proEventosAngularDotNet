using Microsoft.EntityFrameworkCore.Migrations;

namespace ProEventos.Persistence.Migrations
{
    public partial class UpdateIdentity4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Eventos",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Eventos_UserId",
                table: "Eventos",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Eventos_AspNetUsers_UserId",
                table: "Eventos",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Eventos_AspNetUsers_UserId",
                table: "Eventos");

            migrationBuilder.DropIndex(
                name: "IX_Eventos_UserId",
                table: "Eventos");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Eventos");
        }
    }
}
