﻿using AutoMapper;
using MoviesACLabs.Entities;
using MoviesACLabs.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MoviesACLabs.App_Start
{
    public class AutoMapperConfig
    {
        public static void ConfigureAutoMapper()
        {
            Mapper.CreateMap<Actor, ActorModel>();
            Mapper.CreateMap<ActorModel, Actor>();

            Mapper.CreateMap<Movie, MovieModel>();
            Mapper.CreateMap<MovieModel, Movie>();

            Mapper.CreateMap<Review, ReviewModel>();
            Mapper.CreateMap<ReviewModel, Review>();

            Mapper.CreateMap<Award, AwardModel>();
            Mapper.CreateMap<AwardModel, Award>();

            Mapper.CreateMap<FootballPlayer, FootballPlayerModel>();
            Mapper.CreateMap<FootballPlayerModel, FootballPlayer>();

            Mapper.CreateMap<FootballClub, FootballClubModel>();
            Mapper.CreateMap<FootballClubModel, FootballClub>();
        }
    }
}