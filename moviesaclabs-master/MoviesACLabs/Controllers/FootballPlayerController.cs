using AutoMapper;
using MoviesACLabs.Data;
using MoviesACLabs.Entities;
using MoviesACLabs.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MoviesACLabs.Controllers
{
    public class FootballPlayerController : ApiController
    {
        private MoviesContext db = new MoviesContext();

        public IList<FootballPlayerModel> GetFootballPlayers()
        {
            var footballPlayers = db.FootballPlayers;
            var FootballPlayerModel = Mapper.Map<IList<FootballPlayerModel>>(footballPlayers);
            return FootballPlayerModel;
        }

        public IHttpActionResult PostFootballPlayers(FootballPlayerModel player)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var footballPlayer = Mapper.Map<FootballPlayer>(player);
            db.FootballPlayers.Add(footballPlayer);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = footballPlayer.Id }, footballPlayer);
        }

        public IHttpActionResult GetFootballPlayer(int id)
        {
            FootballPlayer footballPlayer = db.FootballPlayers.Find(id);
            if (footballPlayer == null)
            {
                return NotFound();
            }

            var footballPlayerModel = Mapper.Map<FootballPlayerModel>(footballPlayer);

            return Ok(footballPlayerModel);
        }

        public IHttpActionResult DeleteFootballPlayer(int id)
        {
            FootballPlayer footballPlayer = db.FootballPlayers.Find(id);
            if (footballPlayer == null)
            {
                return NotFound();
            }

            db.FootballPlayers.Remove(footballPlayer);
            db.SaveChanges();

            return Ok();
        }

        public IHttpActionResult PutFootballPlayer(int id, FootballPlayerModel footballPlayerModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != footballPlayerModel.Id)
            {
                return BadRequest();
            }

            var footballPlayer = Mapper.Map<FootballPlayer>(footballPlayerModel);
            db.Entry(footballPlayer).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FootballPlayerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        private bool FootballPlayerExists(int id)
        {
            return db.FootballPlayers.Any(e => e.Id == id);
        }

        /* with no db
        private static IList<FootballPlayerModel> footballPlayersList = new List<FootballPlayerModel>();
        private static int id = 1;

        public IList<FootballPlayerModel> GetFootballPlayers()
        {
            return footballPlayersList;
        }

        public void PostFootballPlayer(FootballPlayerModel player)
        {
            player.Id = id;
            id++;

            footballPlayersList.Add(player);
        }

        public FootballPlayerModel GetFootballPlayer(int id)
        {
            foreach (FootballPlayerModel player in footballPlayersList)
            {
                if (player.Id == id)
                {
                    return player;
                }
            }
            return null;
        }

        public void DeleteFootballPlayer(int id)
        {
            foreach (FootballPlayerModel player in footballPlayersList)
            {
                if (player.Id == id)
                {
                    footballPlayersList.Remove(player);
                    break;
                }
            }
        }

        public void PutFootballPlayer(int id, FootballPlayerModel FootballPlayerModel) 
        {
            foreach (FootballPlayerModel player in footballPlayersList)
            {
                if (player.Id == id)
                {
                    player.Age = FootballPlayerModel.Age;
                    player.GoalsScored = FootballPlayerModel.GoalsScored;
                    player.Name = FootballPlayerModel.Name;
                    break;
                }
            }
        }*/
    }
}
