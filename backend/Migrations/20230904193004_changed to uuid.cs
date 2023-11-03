using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace flwnStatus.Migrations
{
    /// <inheritdoc />
    public partial class changedtouuid : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "MacAddress",
                table: "StatusEntities",
                newName: "UUID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UUID",
                table: "StatusEntities",
                newName: "MacAddress");
        }
    }
}
