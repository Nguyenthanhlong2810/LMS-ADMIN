const ValidationMessage = {
  mixed: {
    default: 'Giá trị nhập vào không hợp lệ',
    required: 'Trường này không thể bỏ trống',
    oneOf: 'Trường này phải là một trong các giá trị sau: ${values}',
    notOneOf: 'Trường này không phải là một trong các giá trị sau: ${values}',
    matches: 'Giá trị nhập vào không hợp lệ'
  },
  string: {
    matches: 'Giá trị nhập vào không hợp lệ',
    length: 'Trường này phải có ${length} ký tự',
    min: 'Trường này có tối thiểu ${min} ký tự',
    max: 'Trường này có tối đa ${max} ký tự',
    email: 'Định dạng email không chính xác',
    url: 'Định dạng URL không chính xác',
    trim: 'Giá trị nhập vào không được chứa dấu cách ở đầu hoặc cuối',
    lowercase: 'Giá trị nhập vào phải được viết hoa',
    uppercase: 'Giá trị nhập vào phải được viết thường'
  },
  number: {
    min: 'Giá trị nhập vào nhỏ nhất là ${min}',
    max: 'Giá trị nhập vào lớn nhất là ${max}',
    lessThan: 'Giá trị nhập vào phải nhỏ hơn ${less}',
    moreThan: 'Giá trị nhập vào phải lớn hơn ${more}',
    notEqual: 'Giá trị nhập vào không thể bằng ${notEqual}',
    positive: 'Giá trị nhập vào phải là một số dương',
    negative: 'Giá trị nhập vào phải là một số âm',
    integer: 'Giá trị nhập vào phải là số nguyên',
    typeError: 'Giá trị nhập vào phải là số'
  },
  date: {
    min: 'Phải lớn hơn ngày ${min}',
    max: 'Phải nhỏ hơn ngày ${max}'
  },
  array: {
    min: 'Có ít nhất là ${min} phần tử',
    max: 'Có nhiều nhất là ${max} phần tử'
  }
};

export default ValidationMessage;
