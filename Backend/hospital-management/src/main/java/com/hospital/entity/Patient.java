package com.hospital.entity;

	import jakarta.persistence.*;
	import jakarta.validation.constraints.NotBlank;
	import lombok.*;

	@Entity
	@Table(name="patients")
	@NoArgsConstructor
	@AllArgsConstructor
	public class Patient {

	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;
	    
	    @NotBlank(message = "Patient name is required")
	    private String name;

	    private Integer age;
	    
	    @NotBlank(message = "Gender is required")
	    private String gender;

	    @NotBlank(message = "Disease is required")
	    private String disease;

	    @NotBlank(message = "Address is required")
	    private String address;

	    @NotBlank(message = "Blood group is required")
	    
	    private String bloodGroup;
	    
	    private Long phone;
	    
	    public Long getId() {
	        return id;
	    }

	    public void setId(Long id) {
	        this.id = id;
	    }


	    public String getName() {
	        return name;
	    }

	    public void setName(String name) {
	        this.name = name;
	    }


	    public Integer getAge() {
	        return age;
	    }

	    public void setAge(Integer age) {
	        this.age = age;
	    }


	    public String getGender() {
	        return gender;
	    }

	    public void setGender(String gender) {
	        this.gender = gender;
	    }


	    public String getDisease() {
	        return disease;
	    }

	    public void setDisease(String disease) {
	        this.disease = disease;
	    }
	    
	    public Long getPhone() {
	        return phone;
	    }

	    public void setPhone(Long phone) {
	        this.phone = phone;
	    }

	    public String getAddress() {
	        return address;
	    }

	    public void setAddress(String address) {
	        this.address = address;
	    }
	    
	    public String getBloodGroup() {
	        return bloodGroup;
	    }

	    public void setBloodGroup(String bloodGroup) {
	        this.bloodGroup = bloodGroup;
	    }

	    
	
	}

		