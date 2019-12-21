'use strict';
let all = [];
let pageNum = 1;
function Item(data) {
  // eslint-disable-next-line camelcase
  this.image_url = data.image_url;
  this.keyword = data.keyword;
  this.description = data.description;
  this.horns = data.horns;
  this.title = data.title;
  all.push(this);
}

Item.prototype.render = function () {

  let listClone = $('#image-template').html();
  let template = Handlebars.compile(listClone);
  let output = template(this);
  $('#photo-template').append(output);
  // let listClone = $(`
  // <section class='image-template'>
  // <div class='imagediv'>
  //   <h2></h2>
  //   <img src="" alt="">
  //   <p></p>
  //   <span></span>
  // </div>
  // </section>
  // `).clone();
  // listClone.find('h2').text(this.title);
  // listClone.find('img').attr('src', this.image_url);
  // listClone.find('img').addClass('showImages');
  // listClone.find('p').text(this.description);
  // listClone.find('span').text('Number of Horns ' + this.horns);
  // listClone.addClass(this.keyword);
  // listClone.removeClass('image-template');
  // $('main').append(listClone);
};
// Item.prototype.sortedRender = function () {

// }

$('select').on('change', changeimages);
function changeimages() {
  let selectedimage = $(this).val();
  if (selectedimage === 'default') {
    $('section').show(600);
    $('#title').attr('disabled', false);
    $('#horns').attr('disabled', false);
  } else {
    $('section').hide();
    $('#title').attr('disabled', 'disabled');
    $('#horns').attr('disabled', 'disabled');
    $(`.${selectedimage}`).show(600);
  }
}


$('#p1').on('click', show);
$('#p2').on('click', show);

function readpath(data) {
  $.get(data)
    .then(data => {
      let inside = [];
      data.forEach((value, idx) => {
        let list = new Item(value);
        list.render();
        if (!inside.includes(list.keyword)) {
          let optionRender = $(`<option value = '${list.keyword}'> ${list.keyword} </option>`);
          inside.push(list.keyword);
          optionRender.html();
          $('#mainSelect').append(optionRender);
        }
      });
      show();
    });
}
function show() {
  $('#title').attr('disabled', false);
  $('#horns').attr('disabled', false);
  if (this.id === 'p1') {
    $('section').remove();
    $('select').empty();
    let path = 'data/page-1.json';
    readpath(path);
    renderSelect();
    pageNum = 1;
  } else {
    $('section').remove();
    $('select').empty();
    let path = 'data/page-2.json';
    readpath(path);
    renderSelect();
    pageNum = 2;
  }
}

function renderSelect() {
  let optionRender = $(`<option value = 'default'> Filter By Keyword </option>`);
  optionRender.html();
  $('#mainSelect').append(optionRender);
}

$('#title').on('click', sortByTitle);
function sortByTitle() {
  let path;
  if (pageNum === 1) {
    path = 'data/page-1.json';
  } else {
    path = 'data/page-2.json';
  }
  $('section').remove();
  sortforme(this.id, path);
}

function sortforme(type, path) {
  let sortby = type;
  if (sortby === 'title') {
    $.get(path)
      .then(data => {
        let newdata = data.sort((a, b) => {
          var TitleA = a.title.toUpperCase(); // ignore upper and lowercase
          var Titleb = b.title.toUpperCase(); // ignore upper and lowercase
          if (TitleA < Titleb) {
            return -1;
          }
          if (TitleA > Titleb) {
            return 1;
          }
          // names must be equal
          return 0;
        });
        newdata.forEach((value, idx) => {
          let list = new Item(value);
          list.render();
        });
      });
  } else {
    $.get(path)
      .then(data => {
        let newdata = data.sort((a, b) => {
          var hornsA = a.horns;
          var hornsb = b.horns;
          if (hornsA < hornsb) {
            return -1;
          }
          if (hornsA > hornsb) {
            return 1;
          }
          // names must be equal
          return 0;
        });
        newdata.forEach((value, idx) => {
          let list = new Item(value);
          list.render();
        });
      });
  }

}
$('#horns').on('click', sortByHorns);
function sortByHorns() {
  let path;
  if (pageNum === 1) {
    path = 'data/page-1.json';
  } else {
    path = 'data/page-2.json';
  }
  $('section').remove();
  sortforme(this.id, path);
}
readpath('data/page-1.json');
