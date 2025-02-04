namespace DataManipulation.Models
{
    public class Users
    {
        public int Id { get; set; }
        public int? Ward {  get; set; }
        public string FullName {  get; set; }
        public string Caste { get; set; }
        public string Sex { get; set; }
        public int Age { get; set; }
        public string Religion { get; set; }
        public string Education { get; set; }
        public string? Occupation { get; set; }
        public string Disability { get; set; }
    }
}
