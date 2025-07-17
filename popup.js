document.addEventListener('DOMContentLoaded', function() {
  const saveDataButton = document.getElementById('saveData');
  const retrieveDataButton = document.createElement('button');
  retrieveDataButton.id = 'retrieveData';
  retrieveDataButton.textContent = 'Retrieve Data';
  document.body.appendChild(retrieveDataButton);

  saveDataButton.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.scripting.executeScript({
        target: {tabId: tabs[0].id},
        function: saveData
      });
    });
  });

  retrieveDataButton.addEventListener('click', function() {
    chrome.storage.local.get('webAppData', function(result) {
      const statusDiv = document.getElementById('status');
      if (result.webAppData) {
        statusDiv.textContent = 'Retrieved data: ' + JSON.stringify(result.webAppData);
      } else {
        statusDiv.textContent = 'No data found.';
      }
    });
  });
});

function saveData() {
  // This function is executed in the context of the web page
  const data = {
    // Replace this with the actual data you want to save
    exampleData: 'This is some data from the web app'
  };
  chrome.storage.local.set({webAppData: data}, function() {
    console.log('Data saved');
  });
}
