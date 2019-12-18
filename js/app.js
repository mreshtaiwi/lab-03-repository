'use strict';
let all = [];
function Item(data) {
  this.image_url = data.image_url;
  this.keyword = data.keyword;
  this.description = data.description;
  this.horns = data.horns;
  this.title = data.title;
  all.push(this);
}
Item.prototype.render = function () {
  let listClone = $(`
  <section class='image-template'>
  <div class='imagediv'>
    <h2></h2>
    <img src="" alt="">
    <p></p>
  </div>
  </section>
  `).clone();
  listClone.find('h2').text(this.title);
  listClone.find('img').attr('src', this.image_url);
  listClone.find('img').addClass('showImages');
  listClone.find('p').text(this.description);
  listClone.addClass(this.keyword);
  listClone.removeClass('image-template');
  $('main').append(listClone);
};

let path = 'data/page-1.json';

//read the json file
$.get(path)
  .then(data => {
    let inside = [];
    data.forEach((value, idx) => {
      let list = new Item(value);
      list.render();
      if (!inside.includes(list.keyword)) {
        let optionRender = $(`<option value = ${list.keyword}> ${list.keyword} </option>`)
        inside.push(list.keyword);
        optionRender.html();
        $('#mainSelect').append(optionRender);
      }
    });
  });

$('select').on('change', changeimages);
function changeimages() {
  let selectedimage = $(this).val();
  if (selectedimage === 'default') {
    $('section').fadeIn(200);
  } else {
    $('section').not('.' + selectedimage).fadeOut(600);
    $('.' + selectedimage).fadeIn(200);
  }
}

