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
using System.Web.Http.Description;

namespace MoviesACLabs.Controllers
{
    public class AwardsController : ApiController
    {
        private MoviesContext db = new MoviesContext();
        //private static IList<AwardModel> awardsList = new List<AwardModel>();
        //private static int id = 1;

        // GET: api/Awards 
        //[Route("allAwards")]
        public IList<AwardModel> GetAwards()
        {
            //
            //AwardModel testAward = new AwardModel
            //{
            //    Id = 1,
            //    Title = "The Award",
            //    Description = "Awarded because why not.",
            //    ActorId = 1
            //};

            var awards = db.Awards;
            var awardsModel = Mapper.Map<IList <AwardModel>>(awards);
            return awardsModel;
        }

        // POST: api/Awards
        public IHttpActionResult PostAward(AwardModel awardModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var award = Mapper.Map<Award>(awardModel);
            db.Awards.Add(award);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = award.Id }, award);
        }
        /*public void PostAward(AwardModel award)
        {
            award.Id = id;
            id++;

            awardsList.Add(award);
        }*/
        
        // GET : api/Awards/5
        public IHttpActionResult GetAward(int id)
        {
            Award award = db.Awards.Find(id);
            if(award == null)
            {
                return NotFound();
            }

            var awardModel = Mapper.Map<AwardModel>(award);

            return Ok(awardModel);
        }
        /*[Route("myAward/{id}")]
        public AwardModel GetAward(int id)
        {
            foreach (AwardModel award in awardsList)
            {
                if (award.Id == id)
                {
                    return award;
                }
            }
            return null;
        }*/

        // DELETE : api/Awards/5
        public IHttpActionResult DeleteAward(int id)
        {
            Award award = db.Awards.Find(id);
            if(award == null)
            {
                return NotFound();
            }

            db.Awards.Remove(award);
            db.SaveChanges();

            return Ok();
        }
        /*public void DeleteAward(int id)
        {
            foreach (AwardModel award in awardsList)
            {
                if (award.Id == id)
                {
                    awardsList.Remove(award);
                    break;
                }
            }
        }*/

        // PUT : api/Award/5
        public IHttpActionResult PutAward(int id, AwardModel awardModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != awardModel.Id)
            {
                return BadRequest();
            }

            var award = Mapper.Map<Award>(awardModel);
            db.Entry(award).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AwardExists(id))
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
        /*public void PutAward(int id, AwardModel awardModel) 
        {
            foreach (AwardModel award in awardsList)
            {
                if (award.Id == id)
                {
                    award.Title = awardModel.Title;
                    award.Description = awardModel.Description;
                    award.ActorId = awardModel.ActorId;
                    break;
                }
            }
        }*/

        // get award by title
        [Route("filterAwardsBy/{title}")]
        public IHttpActionResult GetAwardByTitle(string title)
        {
            var awards = db.Awards.Where(award => award.Title == title);

            if(awards == null)
            {
                return NotFound();
            }

            var awardsModel = Mapper.Map<IList<AwardModel>>(awards);

            return Ok(awardsModel);
        }

        private bool AwardExists(int id)
        {
            return db.Awards.Any(e => e.Id == id);
        }
    }
}
