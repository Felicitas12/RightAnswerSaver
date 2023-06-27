using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ExtensionAPI.Entities
{
	public class Tasks
	{
		public Tasks(string Question, string Answer, string Id)
		{
			this.Question = Question;
			this.Answer = Answer;
			this.Id = Id;
		}
		public string Question { get; set; }
		public string Answer { get; set; }
		public string Id { get; set; }
		
	
	}
}
