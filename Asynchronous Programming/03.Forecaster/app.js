async function attachEvents() {

    const submitBtn = document.querySelector("#submit");
  
    const currentForecastDiv = document.querySelector('#current');
    const upcomingForecastDiv = document.querySelector('#upcoming');
  
    const weatherIcons = {
      'Sunny': "&#x2600",
      "Partly sunny": "&#x26C5",
      'Overcast': "&#x2601;",
      'Rain': "&#x2614;",
      'Degrees': "&#176;",
  };
  
    submitBtn.addEventListener("click", () => getTownCode());
  
  
  
    async function getTownCode() {
        
      const inputLocation = document.querySelector("#location").value;
      const url = ` http://localhost:3030/jsonstore/forecaster/locations`;
      const response = await fetch(url);
      const data = await response.json();
      const town = data.filter((t) => t.name === inputLocation);
  
      currentForecastDiv.innerHTML = '';
      upcomingForecastDiv.innerHTML = '';
      document.querySelector("#location").value = '';
  
      getDetailedForecast(town);
    }
  
    async function getDetailedForecast(t) {
  
      const url1 = `http://localhost:3030/jsonstore/forecaster/today/${t[0].code}`;
      const url2 = `http://localhost:3030/jsonstore/forecaster/upcoming/${t[0].code}`;
  
      const icons = {
          "Sunny": "&#x2600;",
          "Partly sunny": "&#x26C5;",
          "Overcast": "&#x2601;",
          "Rain": "&#x2614;",
          "Degrees": "&#176;"
      };
  
      const [today, upcoming] = await Promise.all([
          fetch(url1),
          fetch(url2)
      ]);
  
      const urlToday = await today.json();
      const urlUpcoming = await upcoming.json();
      const hiddenDiv = document.querySelector('#forecast').style.display = 'block';
      const spanIcon = e('span', {}, '');
      spanIcon.innerHTML = icons[urlToday.forecast.condition];
  
      const spanDegree = e('span', {}, '');
      spanDegree.innerHTML = `${urlToday.forecast.low}${icons.Degrees}/${urlToday.forecast.high}${icons.Degrees}`;
  
  
  
      const todaysResult = e('div', {className: 'forecasts'},
      e('span', {className: 'condition symbol'}, spanIcon),
      e('span', {className: 'condition'},
       e('span', {className: 'forecast-data'}, urlToday.name),
       e('span', {className: 'forecast-data'}, spanDegree),
       e('span', {className: 'forecast-data'}, urlToday.forecast.condition))
      );
  
      const infoDiv = e('div', {className: 'forecast-info'},'');
  
      urlUpcoming.forecast.map(day => {
  
          const spanIcon3Day = e('span', {}, '');
          spanIcon3Day.innerHTML = icons[day.condition];
      
          const spanDegree3Day = e('span', {}, '');
          spanDegree3Day.innerHTML = `${day.low}${icons.Degrees}/${day.high}${icons.Degrees}`;
  
          const upcomingResult = 
          e('span', {className: 'upcoming'},
          e('span', {className: 'symbol'}, spanIcon3Day),
          e('span', {className: 'forecast-data'}, spanDegree3Day),
          e('span', {className: 'forecast-data'}, day.condition));
  
          infoDiv.append(upcomingResult);
      });
  
  
      currentForecastDiv.append(todaysResult);
      upcomingForecastDiv.append(infoDiv);
  
    }
  
  
  
    function e(type, attributes, ...content) {
      const result = document.createElement(type);
  
      for (let [attr, value] of Object.entries(attributes || {})) {
        if (attr.substring(0, 2) == "on") {
          result.addEventListener(attr.substring(2).toLocaleLowerCase(), value);
        } else {
          result[attr] = value;
        }
      }
  
      content = content.reduce(
        (a, c) => a.concat(Array.isArray(c) ? c : [c]),
        []
      );
  
      content.forEach((e) => {
        if (typeof e == "string" || typeof e == "number") {
          const node = document.createTextNode(e);
          result.appendChild(node);
        } else {
          result.appendChild(e);
        }
      });
  
      return result;
    }
  }
  
  attachEvents();