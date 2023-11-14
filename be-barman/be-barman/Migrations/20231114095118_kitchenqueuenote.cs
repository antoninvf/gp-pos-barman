using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace be_barman.Migrations
{
    /// <inheritdoc />
    public partial class kitchenqueuenote : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Note",
                table: "KitchenQueueEntities",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Note",
                table: "KitchenQueueEntities");
        }
    }
}
