using MoviesACLabs.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace MoviesACLabs.Controllers
{
    public class AwardsController : ApiController
    {
        private static IList<AwardModel> awardsList = new List<AwardModel>();

        private static int id = 1;

        [Route("allAwards")]
        // GET: api/Awards 
        public IList<AwardModel> GetAwards()
        {
            //AwardModel testAward = new AwardModel
            //{
            //    Id = 1,
            //    Title = "The Award",
            //    Description = "Awarded because why not.",
            //    ActorId = 1
            //};

            return awardsList;
        }

        // POST: api/Awards
        public void PostAward(AwardModel award)
        {
            award.Id = id;
            id++;

            awardsList.Add(award);
        }

        // GET : api/Awards/id
        [Route("myAward/{id}")]
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
        }

        // DELETE : api/Delete/{id}
        public void DeleteAward(int id)
        {
            foreach (AwardModel award in awardsList)
            {
                if (award.Id == id)
                {
                    awardsList.Remove(award);
                    break;
                }
            }
        }

        public void PutAward(int id, AwardModel awardModel) 
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
        }
    }
}
