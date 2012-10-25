var express = require('express');
var app = express();


// http://nodejs.org/api.html#_child_processes
var sys = require('sys')
var exec = require('child_process').exec;
var child;

var builds;
// executes `pwd`
var shell_cmd = "ls -l /home/socialapp/shopycat.com/releases | sort -n -r | head -6 | cut -c 40-100";
child = exec(shell_cmd, function (error, stdout, stderr) {
  builds = stdout;
  var tmp = builds.split("\n");
  for (var i=0;i<tmp.length;i++)
  {
    var subtmp = tmp[i].split(" ");
    var new_tmp = "";
    for (var j=0;j<subtmp.length;j++)
    {
      if (i == 1)
      {

        new_tmp += "<td><h4>" + subtmp[j] + "</h4></td>";
      }
      else
      {
        new_tmp += "<td>" + subtmp[j] + "</td>";
      }
    }
    tmp[i] = "<tr>" + new_tmp + "</tr>"
  }

  tmp[1] = "<b>"+tmp[1]+"</b>";
  builds = tmp.join("");
  builds = "<html><head><style>h4{color: #009933}</style></head><body><table>" + builds + "</table></body></html>";


  sys.print('stdout: ' + stdout);
  //sys.print('stderr: ' + stderr);
  if (error !== null) {
    console.log('exec error: ' + error);
  }
});



app.get('/', function(req, res){
      res.send(builds);
      //res.send('Hello World');
});


app.listen(3000);
console.log('Listening on port 3000');

