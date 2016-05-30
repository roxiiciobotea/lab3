using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MoviesACLabs.Models
{
    public class FootballPlayerModel
    {
        public int Id { get; set;  }
        public int Age { get; set; }

        public int GoalsScored { get; set; }

        public string Name { get; set; }
    }
}