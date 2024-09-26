namespace ToDoApi.Models
{
    public class ToDo
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public bool? IsEditing { get; set; } = false;
        public bool? Done { get; set; } = false;
    }
}
