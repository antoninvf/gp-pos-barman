using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace be_barman.Migrations
{
    /// <inheritdoc />
    public partial class kitchenqueueupdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "KitchenQueueEntities",
                newName: "ProductUUID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ProductUUID",
                table: "KitchenQueueEntities",
                newName: "Name");
        }
    }
}
