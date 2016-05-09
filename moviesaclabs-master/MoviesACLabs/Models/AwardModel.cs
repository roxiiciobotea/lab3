using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MoviesACLabs.Models
{
    public class AwardModel
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public int ActorId { get; set; } 
    }
}