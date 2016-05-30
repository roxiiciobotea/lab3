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
    public class FootballClubController : ApiController
    {
        private MoviesContext db = new MoviesContext();

        public IList<FootballClubModel> GetFootballClubs()
        {
            var footballClubs = db.FootballClubs;
            var footballClubModel = Mapper.Map<IList<FootballClubModel>>(footballClubs);
            return footballClubModel;
        }

        public IHttpActionResult PostFootballClub(FootballClubModel club)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var footballClub = Mapper.Map<FootballClub>(club);
            db.FootballClubs.Add(footballClub);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = footballClub.Id }, footballClub);
        }

        public IHttpActionResult GetFootballClub(int id)
        {
        FootballClub footballClub = db.FootballClubs.Find(id);
        if (footballClub == null)
        {
            return NotFound();
        }

        var footballClubModel = Mapper.Map<FootballClubModel>(footballClub);

        return Ok(footballClubModel);
        }

        public IHttpActionResult DeleteFootballClub(int id)
        {
            FootballClub footballClub = db.FootballClubs.Find(id);
            if (footballClub == null)
            {
                return NotFound();
            }

            db.FootballClubs.Remove(footballClub);
            db.SaveChanges();

            return Ok();
        }

        public IHttpActionResult PutFootballClub(int id, FootballClubModel footballClubModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != footballClubModel.Id)
            {
                return BadRequest();
            }

            var footballClub = Mapper.Map<FootballClub>(footballClubModel);
            db.Entry(footballClub).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FootballClubExists(id))
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

        private bool FootballClubExists(int id)
        {
            return db.FootballClubs.Any(e => e.Id == id);
        }
    }
}
