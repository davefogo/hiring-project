hourNormalizer = (time) ->
  fixedTime = undefined
  if time == '0'
    fixedTime = '0:00'
  else if time.length == 3
    fixedTime = time.slice(0, 1) + ':' + time.slice(1)
  else
    fixedTime = time.slice(0, 2) + ':' + time.slice(2)
  fixedTime

$ ->
  #historical
  today = new Date
  UTCOffsetMinutes = today.getTimezoneOffset()
  UTCOffset = UTCOffsetMinutes * 60000
  now = Date.now()
  console.log 'update charts'
  $.ajax
    url: 'http://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=5c868c1933b54b6685c10828203006&q=30.404251,-97.849442&format=json&date=2020-06-01&enddate=2020-06-30&tp=1&callback=?'
    dataType: 'jsonp'
    async: false
    success: (data) ->
      dataArray = []
      days = data.data.weather
      i = 0
      while i < days.length
        day = days[i]
        date = day.date.split('-').join('/')
        hourlyTemps = day.hourly
        j = 0
        while j < hourlyTemps.length
          hours = hourlyTemps[j]
          time = hourNormalizer(hours.time)
          dateTime = date + ' ' + time
          unixTime = Date.parse(dateTime)
          unixTimeCST = unixTime - UTCOffset
          temp = parseInt(hours.tempF)
          if unixTime < now
            dataArray.push [
              unixTimeCST
              temp
            ]
          j++
        i++
      weatherForAustin = Highcharts.stockChart('container', {
        rangeSelector: selected: 1
        title: text: 'Weather for Austin HQ'
        legend: enabled: true
        series: [ {
          name: 'Historical'
          data: dataArray
        } ]
      }, (weatherForAustin) ->
        $.ajax
          url: 'http://api.worldweatheronline.com/premium/v1/weather.ashx?key=5c868c1933b54b6685c10828203006&q=30.404251,-97.849442&format=json&num_of_days=2&tp=1&callback=?'
          dataType: 'jsonp'
          async: false
          success: (data2) ->
            `var days`
            `var i`
            `var day`
            `var date`
            `var hourlyTemps`
            `var j`
            `var hours`
            `var time`
            `var dateTime`
            `var unixTime`
            `var unixTimeCST`
            `var temp`
            dataArray2 = []
            days = data2.data.weather
            i = 0
            while i < days.length
              day = days[i]
              date = day.date.split('-').join('/')
              hourlyTemps = day.hourly
              j = 0
              while j < hourlyTemps.length
                hours = hourlyTemps[j]
                time = hourNormalizer(hours.time)
                dateTime = date + ' ' + time
                unixTime = Date.parse(dateTime)
                unixTimeCST = unixTime - UTCOffset
                temp = parseInt(hours.tempF)
                if unixTime > now
                  dataArray2.push [
                    unixTimeCST
                    temp
                  ]
                j++
              i++
            weatherForAustin.addSeries
              name: 'Forecast'
              data: dataArray2
            return
        return
      )
      return
  minutes = 30
  setInterval (->
    `var today`
    `var UTCOffsetMinutes`
    `var UTCOffset`
    `var now`
    today = new Date
    UTCOffsetMinutes = today.getTimezoneOffset()
    UTCOffset = UTCOffsetMinutes * 60000
    now = Date.now()
    console.log 'update charts'
    $.ajax
      url: 'http://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=5c868c1933b54b6685c10828203006&q=30.404251,-97.849442&format=json&date=2020-06-01&enddate=2020-06-30&tp=1&callback=?'
      dataType: 'jsonp'
      async: false
      success: (data) ->
        dataArray = []
        days = data.data.weather
        i = 0
        while i < days.length
          day = days[i]
          date = day.date.split('-').join('/')
          hourlyTemps = day.hourly
          j = 0
          while j < hourlyTemps.length
            hours = hourlyTemps[j]
            time = hourNormalizer(hours.time)
            dateTime = date + ' ' + time
            unixTime = Date.parse(dateTime)
            unixTimeCST = unixTime - UTCOffset
            temp = parseInt(hours.tempF)
            if unixTime < now
              dataArray.push [
                unixTimeCST
                temp
              ]
            j++
          i++
        weatherForAustin = Highcharts.stockChart('container', {
          rangeSelector: selected: 1
          title: text: 'Weather for Austin HQ'
          series: [ {
            name: 'Austin HQ Historical'
            data: dataArray
          } ]
        }, (weatherForAustin) ->
          $.ajax
            url: 'http://api.worldweatheronline.com/premium/v1/weather.ashx?key=5c868c1933b54b6685c10828203006&q=30.404251,-97.849442&format=json&num_of_days=2&tp=1&callback=?'
            dataType: 'jsonp'
            async: false
            success: (data2) ->
              `var days`
              `var i`
              `var day`
              `var date`
              `var hourlyTemps`
              `var j`
              `var hours`
              `var time`
              `var dateTime`
              `var unixTime`
              `var unixTimeCST`
              `var temp`
              dataArray2 = []
              days = data2.data.weather
              i = 0
              while i < days.length
                day = days[i]
                date = day.date.split('-').join('/')
                hourlyTemps = day.hourly
                j = 0
                while j < hourlyTemps.length
                  hours = hourlyTemps[j]
                  time = hourNormalizer(hours.time)
                  dateTime = date + ' ' + time
                  unixTime = Date.parse(dateTime)
                  unixTimeCST = unixTime - UTCOffset
                  temp = parseInt(hours.tempF)
                  if unixTime > now
                    dataArray2.push [
                      unixTimeCST
                      temp
                    ]
                  j++
                i++
              weatherForAustin.addSeries
                name: 'Austin HQ Forecast'
                data: dataArray2
              return
          return
        )
        return
    return
  ), 60000 * minutes
  return
