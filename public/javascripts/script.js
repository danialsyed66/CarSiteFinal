$(function () {
  loadCars();
  loadSpareparts();
  loadServices();

  $(".body").on("click", ".btn-danger", handleDelete);

  $(".body").on("click", ".car-cart-btn", handleCarCart);
  $(".body").on("click", ".service-cart-btn", handleServiceCart);
  $(".body").on("click", ".sparepart-cart-btn", handleSparepartCart);

  $(".body").on("click", ".edit-cars", editCars);
  $("#editCarSave").click(handleCarSave);

  $(".body").on("click", ".edit-services", editServices);
  $("#editServiceSave").click(handleServiceSave);

  $(".body").on("click", ".edit-spareparts", editSpareparts);
  $("#editSparepartSave").click(handleSparepartSave);

  $("#addCarSave").click(addCar);

  // $(document).ready(function () {
  //   // let toastme = message;
  //   // console.log("hello world")
  //   // console.log(tos)
  //   // // Display a warning toast, with no title
  //   // toastr.warning(toastme);
  //   // Display a warning toast, with no title
  //   var toastme = "ghgh";
  //   toastr.warning(toastme);
  //   toastr.warning(
  //     "My name is Inigo Montoya. You killed my father, prepare to die!"
  //   );

  //   // Display a success toast, with a title
  //   toastr.success("Have fun storming the castle!", "Miracle Max Says");

  //   // Display an error toast, with a title
  //   toastr.error(
  //     "I do not think that word means what you think it means.",
  //     "Inconceivable!"
  //   );

  //   // Override global options
  //   toastr.success(
  //     "We do have the Kapua suite available.",
  //     "Turtle Bay Resort",
  //     { timeOut: 5000 }
  //   );
  // });
});

function loadCars() {
  $.ajax({
    url: "/api/cars",
    method: "GET",
    error: function (response) {
      var cars = $("#cars");
      cars.html("An error occoured");
    },
    success: function (response) {
      var cars = $("#cars");
      cars.empty();
      for (var i = 0; i < response.length; i++) {
        cars.append(`<tr class="text-center" id="del-tr" data="cars" data-id="${
          response[i]._id
        }">
                        <td>${i + 1}</td>
                        <td>${response[i].name}</td>
                        <td>${response[i].model}</td>
                        <td>${response[i].used}</td>
                        <td>${response[i].price}</td>
                        <td class="col-1"> <button class="btn btn-danger del-btn float-right"> Delete </button> </td>
                        <td class="col-1"> <button class="btn btn-info float-right edit-cars" data-toggle="modal" data-target="#editCarModal"> Edit </button> </td>
                        <td class="col-2"> <button class="btn btn-primary car-cart-btn float-right"> Add to Cart </button> </td>
                    </tr>`);
      }
    },
  });
}

function addCar() {
  var name = $("#addCarName").val();
  var model = $("#addCarModel").val();
  var used = true;
  var price = $("#addCarPrice").val();
  $.ajax({
    url: "/api/cars",
    data: { name, model, used, price },
    method: "POST",
    error: function (response) {
      var cars = $("#cars");
      cars.html("An error occoured in add new product");
    },
    success: function () {
      window.location.replace("/buy");
    },
  });
}

function loadSpareparts() {
  $.ajax({
    url: "/api/spareparts",
    method: "GET",
    error: function (response) {
      var spareparts = $(".spareparts");
      spareparts.html("An error occoured");
    },
    success: function (response) {
      var spareparts = $(".spareparts");
      spareparts.empty();
      for (var i = 0; i < response.length; i++) {
        spareparts.append(`<tr class="text-center" data="spareparts" data-id="${
          response[i]._id
        }">
                          <td>${i + 1}</td>
                          <td>${response[i].name}</td>
                          <td>${response[i].company}</td>
                          <td>${response[i].model}</td>
                          <td>${response[i].price}</td>
                          <td class="col-1"> <button class="btn btn-danger del-btn float-right"> Delete </button> </td>
                          <td class="col-1"> <button class="btn btn-info float-right edit-spareparts" data-toggle="modal" data-target="#editSparepartModal"> Edit </button> </td>
                          <td class="col-2"> <button class="btn btn-primary sparepart-cart-btn float-right"> Add to Car </button> </td>
                      </tr>`);
      }
    },
  });
}

function loadServices() {
  $.ajax({
    url: "/api/services",
    method: "GET",
    error: function (response) {
      var services = $(".services");
      services.html("An error occoured");
    },
    success: function (response) {
      var services = $(".services");
      services.empty();
      for (var i = 0; i < response.length; i++) {
        services.append(`<tr class="text-center" data="services" data-id="${
          response[i]._id
        }">
                          <td>${i + 1}</td>
                          <td>${response[i].name}</td>
                          <td>${response[i].price}</td>
                          <td class="col-1"> <button class="btn btn-danger del-btn float-right"> Delete </button> </td>
                          <td class="col-1"> <button class="btn btn-info float-right edit-services" data-toggle="modal" data-target="#editServiceModal"> Edit </button> </td>
                          <td class="col-2"> <button class="btn btn-primary service-cart-btn float-right"> Add to Car </button> </td>
                      </tr>`);
      }
    },
  });
}

function handleDelete() {
  var btn = $(this);
  var parentTr = btn.closest(".text-center");
  let data = parentTr.attr("data");
  let id = parentTr.attr("data-id");
  $.ajax({
    url: "/api/" + data + "/" + id,
    method: "DELETE",
    error: function (response) {
      var products = $("#products");
      products.html("An error occoured in delete");
    },
    success: function () {
      location.reload(true);
    },
  });
}
function handleCarCart() {
  var btn = $(this);
  var parentTr = btn.closest(".text-center");
  let id = parentTr.attr("data-id");

  window.location.replace("/api/cars/cart/" + id);
}
function handleServiceCart() {
  var btn = $(this);
  var parentTr = btn.closest(".text-center");
  let id = parentTr.attr("data-id");

  window.location.replace("/api/services/cart/" + id);
}
function handleSparepartCart() {
  var btn = $(this);
  var parentTr = btn.closest(".text-center");
  let id = parentTr.attr("data-id");

  window.location.replace("/api/spareparts/cart/" + id);
}

function editCars() {
  var btn = $(this);
  var parentTr = btn.closest(".text-center");
  let data = parentTr.attr("data");
  let id = parentTr.attr("data-id");
  $.get("/api/cars/" + id, function (response) {
    $("#editCarID").val(response._id);
    $("#editCarName").val(response.name);
    $("#editCarModel").val(response.model);
    $("#editCarPrice").val(response.price);
    $("#editCarModal").modal("show");
  });
}
function handleCarSave() {
  var id = $("#editCarID").val();
  var name = $("#editCarName").val();
  var price = $("#editCarPrice").val();
  var model = $("#editCarModel").val();
  var used = true;

  $.ajax({
    url: "/api/cars/" + id,
    data: { name, price, model, used },
    method: "PUT",
    error: function (response) {
      var products = $("#products");
      products.html("An error occoured in edit");
    },
    success: function () {
      $("#editModal").modal("hide");
      window.location.replace("/buy");
    },
  });
}

function editServices() {
  var btn = $(this);
  var parentTr = btn.closest(".text-center");
  let data = parentTr.attr("data");
  let id = parentTr.attr("data-id");
  $.get("/api/services/" + id, function (response) {
    $("#editServiceID").val(response._id);
    $("#editServiceName").val(response.name);
    $("#editServiceModel").val(response.model);
    $("#editServicePrice").val(response.price);
    $("#editServiceModal").modal("show");
  });
}
function handleServiceSave() {
  var id = $("#editServiceID").val();
  var name = $("#editServiceName").val();
  var price = $("#editServicePrice").val();
  var model = $("#editServiceModel").val();
  var used = true;

  $.ajax({
    url: "/api/services/" + id,
    data: { name, price, model, used },
    method: "PUT",
    error: function (response) {
      var products = $("#products");
      products.html("An error occoured in edit");
    },
    success: function () {
      $("#editModal").modal("hide");
      window.location.replace("/buy");
    },
  });
}

function editSpareparts() {
  var btn = $(this);
  var parentTr = btn.closest(".text-center");
  let data = parentTr.attr("data");
  let id = parentTr.attr("data-id");
  $.get("/api/spareparts/" + id, function (response) {
    $("#editSparepartID").val(response._id);
    $("#editSparepartName").val(response.name);
    $("#editSparepartModel").val(response.model);
    $("#editSparepartPrice").val(response.price);
    $("#editSparepartModal").modal("show");
  });
}

function handleSparepartSave() {
  var id = $("#editSparepartID").val();
  var name = $("#editSparepartName").val();
  var price = $("#editSparepartPrice").val();
  var model = $("#editSparepartModel").val();
  var used = true;

  $.ajax({
    url: "/api/spareparts/" + id,
    data: { name, price, model, used },
    method: "PUT",
    error: function (response) {
      var products = $("#products");
      products.html("An error occoured in edit");
    },
    success: function () {
      $("#editModal").modal("hide");
      window.location.replace("/buy");
    },
  });
}
