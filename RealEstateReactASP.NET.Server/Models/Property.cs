namespace RealEstateReactASP.NET.Server.Models
{
    public class Property
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Location { get; set; }
        public decimal Price { get; set; }
        public string? ImageUrl { get; set; }
        public string? OwnerId { get; set; }
        public User? Owner { get; set; }
    }
}
