const Enzyme = require('enzyme');
const EnzymeAdapter = require('enzyme-adapter-react-16');

// set adapter
Enzyme.configure({ adapter: new EnzymeAdapter() });