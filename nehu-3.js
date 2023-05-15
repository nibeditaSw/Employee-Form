import { html, css, LitElement } from 'lit';


class EmployeeForm extends LitElement {
  static styles = css`

  

  

    
  `;

  static properties = {
    fullName: { type: String },
    employeeCode: { type: String },
    officialEmail: { type: String },
    personalEmail: { type: String },
    designation: { type: String },
    department: { type: String },
    primaryContact: { type: String },
    secondaryContact: { type: String },
    emergencyContact: { type: String },
    
    errorMessages: { type: Object },
    
  };

  constructor() {
    super();
    this.fullName = '';
    this.employeeCode = '';
    this.officialEmail = '';
    this.personalEmail = '';
    this.designation = '';
    this.department = '';
    this.departments = ['Information Technology', 'Creative Services', 'Media Services', 'Marketing Science'];
    this.primaryContact = '';
    this.secondaryContact = '';
    this.emergencyContact = '';
    
    this.errorMessages = {};
    
    
  }

  render() {
    return html`
    <h2>Employee Data Form</h2>
    <form @submit=${this.handleSubmit}>
    <label for="fullName">Full Name:</label> 
        <input
          type="text"
          id="fullName"
          .value=${this.fullName}
          @input=${this.handleInputChange}
        />
        ${this.errorMessages.fullName ? html`<p>${this.errorMessages.fullName}</p>` : ''}


    <label for="employeeCode">Employee Code:</label>
        <input
          type="text"
          id="employeeCode"
          .value=${this.employeeCode}
          @input=${this.handleInputChange}
          required
        pattern="[A-Za-z][0-9]{6}"
          
        />
        ${this.errorMessages.employeeCode ? html`<p>${this.errorMessages.employeeCode}</p>` : ''}


    <label for="officialEmail">Official Email:</label>
        <input
          type="email"
          id="officialEmail"
          .value=${this.officialEmail}
          @input=${this.handleInputChange}
          required
          pattern="[a-zA-Z0-9._%+-]+@annalect\.com|outlook\.com"
        />
        ${this.errorMessages.officialEmail ? html`<p>${this.errorMessages.officialEmail}</p>` : ''}


    <label for="personalEmail">Personal Email:</label>
        <input
          type="email"
          id="personalEmail"
          .value=${this.personalEmail}
          @input=${this.handleInputChange}
          required
          pattern="[a-zA-Z0-9._%+-]+@gmail\.com|yahoo\.com"
        />
        ${this.errorMessages.personalEmail ? html`<p>${this.errorMessages.personalEmail}</p>` : ''}


    <label for="designation">Designation:</label>
    <select id="designation" @change=${this.handleInputChange}>
      <option value="">Select designation</option>
      <option value="Lead Engineering">Lead Engineering</option>
      <option value="Manager">Manager</option>
      <option value="Senior Associate">Senior Associate</option>
      <option value="Junior Associate">Junior Associate</option>
      <option value="Graduate Trainee">Graduate Trainee</option>
    </select>
    ${this.errorMessages.designation ? html`<p>${this.errorMessages.designation}</p>` : ''}
    <br>

    <label for="department">Department:</label>
        <select id="department" @change=${this.handleInputChange}>
          <option value="">Select department</option>
          ${this.departments.map(
            (dept) =>
              html`
                <option value=${dept}>${dept}</option>
              `)}
        </select>
        ${this.errorMessages.department ? html`<p>${this.errorMessages.department}</p>` : ''}
        <br>
      

    <label for="primaryContact">Primary Contact:</label>
    <input
      type="tel"
      id="primaryContact"
      .value=${this.primaryContact}
      @input=${this.handleInputChange}
      required
      pattern="[0-9]{10}"
    />
    ${this.errorMessages.primaryContact ? html`<p>${this.errorMessages.primaryContact}</p>` : ''}

    


    <label for="secondaryContact">Secondary Contact:</label>
    <input
      type="tel"
      id="secondaryContact"
      .value=${this.secondaryContact}
      @input=${this.handleInputChange}
      required
      pattern="[0-9]{10}"
    />
    ${this.errorMessages.secondaryContact ? html`<p>${this.errorMessages.secondaryContact}</p>` : ''}

    


    <label for="emergencyContact">Emergency Contact:</label>
    <input
      type="tel"
      id="emergencyContact"
      .value=${this.emergencyContact}
      @input=${this.handleInputChange}
      required
      pattern="[0-9]{10}"
    />
    ${this.errorMessages.emergencyContact ? html`<p>${this.errorMessages.emergencyContact}</p>` : ''}

    





        <button type="submit">Submit</button>
      </form>
    `;
  }

  
  





  handleInputChange(event) {
    const { id, value } = event.target;
    this[id] = value;
    this.errorMessages[id] = '';
  }

  handleSubmit(event) {
    event.preventDefault();

    const errorMessages = {};

    if (!this.fullName) {
      errorMessages.fullName = 'Full Name cannot be empty';
    } else if (this.fullName.length > 40) {
      errorMessages.fullName = 'Full Name cannot exceed 40 characters'; 
    }

    if (!this.employeeCode) {
      errorMessages.employeeCode = 'Employee Code is required';
    } 

    if (!this.officialEmail) {
      errorMessages.officialEmail = 'Official Email is required';
    }

    if (!this.personalEmail) {
      errorMessages.personalEmail = 'Personal Email is required';
    }

    if (!this.designation) {
        errorMessages.designation = 'Designation is required';
    }

    if (!this.department) {
        errorMessages.department = 'Department is required';
    }

    if (!this.primaryContact) {
        errorMessages.primaryContact = 'Primary Contact is required';
    } else if (!/^\d{10}$/.test(this.primaryContact)) {
        errorMessages.primaryContact = 'Primary Contact should be a 10-digit number';
    }

    if (!this.secondaryContact) {
        errorMessages.secondaryContact = 'Secondary Contact is required';
    } else if (!/^\d{10}$/.test(this.secondaryContact)) {
        errorMessages.secondaryContact = 'Secondary Contact should be a 10-digit number';
    }

    if (!this.emergencyContact) {
        errorMessages.emergencyContact = 'Emergency Contact is required';
    } else if (!/^\d{10}$/.test(this.emergencyContact)) {
        errorMessages.emergencyContact = 'Emergency Contact should be a 10-digit number';
    }
    
    
    
    

    if (Object.keys(errorMessages).length > 0) {
        this.errorMessages = errorMessages;
      } else {
     
        
        // Validation successful, proceed with storing data
        const employeeData = {
          fullName: this.fullName,
          employeeCode: this.employeeCode,
          officialEmail: this.officialEmail,
          personalEmail: this.personalEmail,
          designation: this.designation,
          department: this.department,
          primaryContact: this.primaryContact,
          secondaryContact: this.secondaryContact,
          emergencyContact: this.emergencyContact,
         
         
        };
      
        // Save data to local storage as JSON
        const storedData = JSON.parse(localStorage.getItem('employees')) || [];
        storedData.push(employeeData);
        localStorage.setItem('employees', JSON.stringify(storedData));
      
        // Reset form values
        this.fullName = '';
        this.employeeCode = '';
        this.officialEmail = '';
        this.personalEmail = '';
        this.designation = '';
        this.department = '';
        this.primaryContact = '';
        this.secondaryContact = '';
        this.emergencyContact = '';
        
       
      
        // Clear error messages
        this.errorMessages = {};
      }
    }
}

customElements.define('nehu-3', EmployeeForm);  
