$(function () {
  $('.del-btn').click(handleDeleteModel);
  $('#del-btn-Model').click(handleDelete);

  $('.car-cart-btn').click(handleCarCart);
  $('.service-cart-btn').click(handleServiceCart);
  $('.sparepart-cart-btn').click(handleSparepartCart);

  $('.edit-cars').click(editCars);
  $('#editCarSave').click(handleCarSave);

  $('.edit-services').click(editServices);
  $('#editServiceSave').click(handleServiceSave);

  $('.edit-spareparts').click(editSpareparts);
  $('#editSparepartSave').click(handleSparepartSave);

  $('#addCarSave').click(addCar);

  $('#addCarSave').click(handleCarAdd);
});

function handleCarAdd() {
  var title = $('#addBookTitle').val();
  var author = $('#addBookTitle').val();
  var publishYear = $('#addCarModel').val();
  var isbnNumber = $('#addBookISBNNumber').val();

  $.ajax({
    url: '/api/books',
    data: { title, author, publishYear, isbnNumber },
    method: 'POST',

    error: function (response) {
      var cars = $('#books');
      books.html('An error occoured in add new book');
    },

    success: function () {
      window.location.replace('/list/books');
    },
  });
}

function handleDeleteModel() {
  var btn = $(this);
  var parentTr = btn.closest('.text-center');
  let id = parentTr.attr('data-id');

  $('#deleteID').val(id);
}

function handleDelete() {
  var id = $('#deleteID').val();

  $.ajax({
    url: '/api/' + data + '/' + id,
    method: 'DELETE',
    success: function () {
      console.log(1);
      location.reload(true);
    },
    error: function (response) {
      console.log(response);
      location.reload(true);
    },
  });
}

function handleCarCart() {
  var btn = $(this);
  var parentTr = btn.closest('.text-center');
  let id = parentTr.attr('data-id');

  window.location.replace('/api/cars/cart/' + id);
}

function handleServiceCart() {
  var btn = $(this);
  var parentTr = btn.closest('.text-center');
  let id = parentTr.attr('data-id');

  window.location.replace('/api/services/cart/' + id);
}

function handleSparepartCart() {
  var btn = $(this);
  var parentTr = btn.closest('.text-center');
  let id = parentTr.attr('data-id');

  window.location.replace('/api/spareparts/cart/' + id);
}

function addCar() {
  var name = $('#addCarName').val();
  var model = $('#addCarModel').val();
  var used = true;
  var price = $('#addCarPrice').val();
  $.ajax({
    url: '/api/cars',
    data: { name, model, used, price },
    method: 'POST',
    error: function (response) {
      var cars = $('#cars');
      cars.html('An error occoured in add new product');
    },
    success: function () {
      window.location.replace('/buy');
    },
  });
}

function editCars() {
  var btn = $(this);
  var parentTr = btn.closest('.text-center');
  let id = parentTr.attr('data-id');
  $.get('/api/cars/' + id, function (response) {
    $('#editCarID').val(response._id);
    $('#editCarName').val(response.name);
    $('#editCarModel').val(response.model);
    $('#editCarPrice').val(response.price);
    $('#editCarModal').modal('show');
  });
}

function handleCarSave() {
  var id = $('#editCarID').val();
  var name = $('#editCarName').val();
  var price = $('#editCarPrice').val();
  var model = $('#editCarModel').val();
  var used = true;

  $.ajax({
    url: '/api/cars/' + id,
    data: { name, price, model, used },
    method: 'PUT',
    error: function (response) {
      $('#editModal').modal('hide');
      window.location.replace('/buy');
    },
    success: function () {
      $('#editModal').modal('hide');
      window.location.replace('/buy');
    },
  });
}

function editServices() {
  var btn = $(this);
  var parentTr = btn.closest('.text-center');
  let data = parentTr.attr('data');
  let id = parentTr.attr('data-id');
  $.get('/api/services/' + id, function (response) {
    $('#editServiceID').val(response._id);
    $('#editServiceName').val(response.name);
    $('#editServicePrice').val(response.price);
    $('#editServiceModal').modal('show');
  });
}

function handleServiceSave() {
  var id = $('#editServiceID').val();
  var name = $('#editServiceName').val();
  var price = $('#editServicePrice').val();

  $.ajax({
    url: '/api/services/' + id,
    data: { name, price },
    method: 'PUT',
    error: function (response) {
      $('#editModal').modal('hide');
      window.location.replace('/buy');
    },
    success: function () {
      $('#editModal').modal('hide');
      window.location.replace('/buy');
    },
  });
}

function editSpareparts() {
  var btn = $(this);
  var parentTr = btn.closest('.text-center');
  let data = parentTr.attr('data');
  let id = parentTr.attr('data-id');
  $.get('/api/spareparts/' + id, function (response) {
    $('#editSparepartID').val(response._id);
    $('#editSparepartName').val(response.name);
    $('#editSparepartCompany').val(response.company);
    $('#editSparepartModel').val(response.model);
    $('#editSparepartPrice').val(response.price);
    $('#editSparepartModal').modal('show');
  });
}

function handleSparepartSave() {
  var id = $('#editSparepartID').val();
  var name = $('#editSparepartName').val();
  var company = $('#editSparepartCompany').val();
  var price = $('#editSparepartPrice').val();
  var model = $('#editSparepartModel').val();
  var used = true;

  $.ajax({
    url: '/api/spareparts/' + id,
    data: { name, price, model, used, company },
    method: 'PUT',
    error: function (response) {
      $('#editModal').modal('hide');
      window.location.replace('/services');
    },
    success: function () {
      $('#editModal').modal('hide');
      window.location.replace('/services');
    },
  });
}
