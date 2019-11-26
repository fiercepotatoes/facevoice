import { action, observable } from 'mobx';
// import { api } from '../config';

// Axios (used for loading static translation file)
import axios from 'axios';

let obx = observable({
  /*-------------------------------------------
    Loading
  -------------------------------------------*/
  loadingCalls: [],
  loading: false,
  loadingClass: '',

  /**
	 * startLoading - Sets loading state to true and adds the provided request to the array of current requests
   * @param {string} request - The name of the request being loaded
	 */
  startLoading: action(function(request) {
    obx.loading = true;
    obx.loadingCalls.push(request)
  }),

  /**
	 * finishLoading - Removes the provided request from the array of requests and sets the loading state to false if the request array is empty
   * @param {string} request - The name of the request being loaded
	 */
  finishLoading: action(function(request) {
    const requestIndex = obx.loadingCalls.indexOf(request);

    if(requestIndex >= 0) {
      obx.loadingCalls.splice(requestIndex, 1);
    } else {
      obx.loadingCalls.length = 0;
    }

    if(obx.loadingCalls.length === 0 || typeof request === 'undefined') {
      obx.loadingClass = 'leave';
      obx.loading = false;

      // Wait for loader to fade out before removing
      setTimeout(function(){
        obx.loadingClass = '';
        obx.loadingMessage = null;
      }, 250);
    }
  }),

  /*-------------------------------------------
    Error handling
  -------------------------------------------*/
  /**
	 * throwError - Determines whether to show a specific or general error message
   * @param {object} error
	 */
  throwError: action(function(error){
    obx.finishLoading();

    console.error(error);

    if(typeof error.response !== 'undefined') {
      // API errors will return an error object with a response
      // which means we have a message for them
      obx.showErrorMsg(error.response.data);
    } else {
      // If there’s no response with the error, it’s a server
      // connection error (i.e. axios can’t reach the URL)
      obx.showErrorMsg();
    }
  }),

  /**
	 * showErrorMsg - Shows a pop-up dialog with the appropriate error message for a provided error
   * @param {object} data - The error data
   * @param {string} data.code - The error code
	 */
  showErrorMsg: action(function(data){
    obx.dialog = true;
    obx.dialogContent.heading = obx.translation.Errors.heading;
    obx.dialogContent.button = obx.translation.Errors.button;

    if(!data) {
      // Server error (API call returned no data)
      obx.dialogContent.body = obx.translation.Errors[1301].message;
    } else {
      // API call returned data
      if(typeof obx.translation.Errors[data.code] !== 'undefined') {
        // Error translation exists
        obx.dialogContent.body = obx.translation.Errors[data.code].message;
      } else {
        // Error translation does not exist
        console.warn('Error code not present in translation file. Falling back to API response message');
        obx.dialogContent.body = data.message;
      }
    }

    // Redirect expired session
    if(data && data.code === '5002') {
      window.location.href = '/#/session-expired';
    }
  }),

  /*-------------------------------------------
    Translation
  -------------------------------------------*/
  locale: 'en',
  translation: null,
  translationLoaded: false,

  /**
	 * getTranslation - Loads the appropriate translation file
   * @param {string} locale
	 */
  getTranslation: action(function(locale){
    obx.translationLoaded = true;

    const timestamp = (new Date()).getTime();

    obx.startLoading('getTranslation');

    axios.get(`/json/${obx.locale}.json?t=${timestamp}`)
      .then(response => {
        obx.translation = response.data.content;
        obx.finishLoading('getTranslation');
      })
      .catch(error => {
        obx.throwError(error);
      });
  }),

  /*-------------------------------------------
    Dialog box
  -------------------------------------------*/
  dialog: false,
  dialogContent: {},
  dialogCallback: null,

  /**
	 * showDialog - Shows a pop-up dialog box with the provided content
   * @param {object} content
	 */
  showDialog: action(function(content){
    if(content) {
      obx.dialogContent = content;
    }

    obx.dialog = true;

    // Focus the dialog
    const dialogTitle = document.querySelector('.dialog__title');

    if(dialogTitle) {
      dialogTitle.focus();
    }
  }),

  /**
	 * closeDialog - Closes the pop-up dialog box
   * @param {object} content
	 */
  closeDialog: action(function(){
    obx.dialog = false;
    obx.dialogContent = {};

    // Focus the main content element
    const main = document.querySelector('#main-content');

    if(main) {
      main.focus();
    }

    // Dialog callback
    if(obx.dialogCallback) {
      obx.dialogCallback();
      obx.dialogCallback = null;
    }
  })
});

export default obx;
