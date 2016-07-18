// Load module node-persist
var storage = require('node-persist');

// Hàm khởi tạo
// Load dữ liệu đã lưu trên ổ đĩa
storage.initSync({
    dir: "students" // Cấu hình nơi lưu trữ dữ liệu nằm trong thư mục students
});

// Hàm lấy danh sách sinh viên
function getAllStudents() {
    // Lấy sinh viên từ nơi lưu trữ
    var students = storage.getItemSync('students');

    // Nếu không có sinh nào thì trả về một mảng rỗng
    if(typeof students === 'undefined')
    {
        return [];
    }

    // Ngược lại trả về danh sách sinh viên
    return students;
}

// Hàm lấy chi tiết sinh viên
function getStudent(id) {
    // Lấy danh sách sinh viên
    var students = getAllStudents();

    // Biến lưu trữ sinh viên được tìm thấy
    var matchedStudent = null;

    // Lập để tìm sinh viên
    for (var i = 0; i  < students.length; i++) {
        if(students[i].id === id)
        {
            matchedStudent = students[i];
            return matchedStudent;
        }        
    }
    return matchedStudent;
}

// Hàm thêm 1 sinh viên
function addStudent(id, name) {
    var students = getAllStudents();

    for (var i = 0; i  < students.length; i++) {
        if(students[i].id === id)
        {
            editStudent(id, name);
            return;
        }        
    }

    students.push(
        {
            id : id,
            name : name
        }
    );

    storage.setItemSync('students', students);
}

// Hàm xóa 1 sinh viên
function removeStudent(id) {
    
    var students = getAllStudents();
    
    for (var i = 0; i < students.length; i++) {
        if(students[i].id === id)
        {
            students.splice('i', 1);
        }
    }

    storage.setItemSync('students', students);
}

// Hàm sửa sinh viên
function editStudent(id, name) {
    var students = getAllStudents();
    
    for (var i = 0; i < students.length; i++) {
        if(students[i].id === id)
        {
            students[i].name = name;
        }
    }

    storage.setItemSync('students', students);
}

// Hàm hiển thị danh sách sinh viên
function showStudent() {
    var students = getAllStudents();

    students.forEach(function(student) {
        console.log('Student: ' + student.name + ' (' + student.id + ')');   
    });
}

addStudent(1, 'Quỳnh');
addStudent(2, 'Như');
addStudent(3, 'Trúc');
addStudent(4, 'Thanh');
addStudent(5, 'Nga');

showStudent();