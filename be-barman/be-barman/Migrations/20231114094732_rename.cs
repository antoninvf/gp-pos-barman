using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace be_barman.Migrations
{
    /// <inheritdoc />
    public partial class rename : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_FoodQueueEntities",
                table: "FoodQueueEntities");

            migrationBuilder.RenameTable(
                name: "FoodQueueEntities",
                newName: "KitchenQueueEntities");

            migrationBuilder.AddPrimaryKey(
                name: "PK_KitchenQueueEntities",
                table: "KitchenQueueEntities",
                column: "UUID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_KitchenQueueEntities",
                table: "KitchenQueueEntities");

            migrationBuilder.RenameTable(
                name: "KitchenQueueEntities",
                newName: "FoodQueueEntities");

            migrationBuilder.AddPrimaryKey(
                name: "PK_FoodQueueEntities",
                table: "FoodQueueEntities",
                column: "UUID");
        }
    }
}
