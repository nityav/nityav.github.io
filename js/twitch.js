
        function getJSONP(url, success) {

            var ud = '_' + +new Date,
					script = document.createElement('script'),
					head = document.getElementsByTagName('head')[0]
							|| document.documentElement;

            window[ud] = function (data) {
                head.removeChild(script);
                success && success(data);
            };

            script.src = url.replace('callback=?', 'callback=' + ud);
            head.appendChild(script);

        }


                function search() {
                   
                    key = document.getElementById('query').value;
                    counter = 1;
                  //checking if a key value is empty or default
                    if (key == "Search Query") {
                        alert('Please enter something');
                        document.getElementById('query').focus();
                        return false; // cancel submission and go back to the textbox
                    }
                    else {
                        document.getElementById("error").innerHTML = "";
                        document.getElementById("Summary").style.display = 'none';
                        var url = 'https://api.twitch.tv/kraken/search/streams?q=' + key + '&limit=10&callback=?'; 
                        // calling the twitch API
                        getJSONP(url, function (data) { // anonymous function to do all the processing
                            if (data._total > 0) { // check if ateast one result exist
                              showResults(data); // show the results 
                              
                            }
                            else { // no result found
                                document.getElementById("results").innerHTML = "<h3> No results found! Please try another search.</h3>";
                                document.getElementById('query').focus(); // giving the texbox focus again
                            }

                        });
                    }
                }

                function Next() {
                    document.getElementById("error").innerHTML = "";                  
                    if (counter < page) {
                        ++counter;
                        var url = 'https://api.twitch.tv/kraken/search/streams?q=' + key + '&limit=10&offset=' + (counter - 1) * 10 + '&callback=?'
                        getJSONP(url,showResults);                     
                       
                    }
                    else {
                        document.getElementById("error").innerHTML = "<p class='bg-warning'><h3> You have reached the end.No more results!</h3></p>";
                    }

                    console.log(counter);
                }

        function prev() {
            document.getElementById("error").innerHTML = "";
            if (counter > 1) {
                --counter;
                var url = 'https://api.twitch.tv/kraken/search/streams?q=' + key + '&limit=10&offset=' + counter * 10 + '&callback=?'
                getJSONP(url, showResults); 
            }
            else {
                document.getElementById("error").innerHTML = "<p class='bg-warning'><h3> You are on page 1.No Previous results</h3></p>";

            }
            console.log(counter);

        }

        function showResults(data) {
            console.log(data);
            var output = '';
            for (var result = 0; result < data.streams.length; result++) {
                output += "<div class=\"col-xs-12 col-sm-12 col-lg-12 stream\"><img class=\"img-test img-responsive\" src=\"" + data.streams[result].preview.medium + "\"></img><div float=\"right\"><h3>" + data.streams[result].game + "</h3> Game Name:" + data.streams[result].channel.game + " - " + data.streams[result].viewers + " Viewers<br/>Stream Description: " + data.streams[result].channel.status + "</div></div>";
            }
            document.getElementById("results").innerHTML = output;
            document.getElementById('total').innerHTML = data._total; // in a lot of cases i have observed the total changes so checking it with each call
            page = Math.ceil(data._total / 10);
            document.getElementById("pageNumber").innerHTML = counter + "/" + page;
            document.getElementById("Summary").style.display = 'block';


        }

        function inputFocus(i) {
            if (i.value == i.defaultValue) {
                i.value = "";
                i.style.color = "#000";
            }
        }
        function inputBlur(i) {
            if (i.value == "") {
                i.value = i.defaultValue;
                i.style.color = "#888";
            }
        }


