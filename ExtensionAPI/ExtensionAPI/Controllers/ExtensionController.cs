using ExtensionAPI.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;


namespace ExtensionAPI.Controllers
{

	[Route("api/[controller]")]
	[ApiController]
	public class ExtensionController : Controller
	{
		 string file;

		[HttpGet("getQuestions")]
		public async Task<IActionResult> GetAnswer(string id)
		{
			file = System.IO.File.ReadAllText("questions.json");

			string answer = default;

			var task = JsonSerializer.Deserialize<IList<Tasks>>(file);


			Tasks tasks = task.FirstOrDefault(d => d.Id == id);
			if (tasks != null) answer = tasks.Answer;






			return Ok(answer);
		}

		[HttpPost("setQuestion")]
		public async Task<IActionResult> setQuestion(string Question, string Answer, string Id)
		{
			file = System.IO.File.ReadAllText("questions.json");
			var list = JsonSerializer.Deserialize<List<Tasks>>(file);

			list.Add(new Tasks(Question, Answer, Id));

			using (FileStream fs = new FileStream("questions.json", FileMode.OpenOrCreate))
			{
				await JsonSerializer.SerializeAsync<IList<Tasks>>(fs, list);
			}

			return Ok();
		}

	}
}
