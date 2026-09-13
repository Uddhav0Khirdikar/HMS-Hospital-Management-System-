package com.hospital.entity;

	import jakarta.persistence.*;
	import lombok.*;

	@Entity
	@Table(name="patients")
	@NoArgsConstructor
	@AllArgsConstructor
	public class Patient {

	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    private String name;

	    private int age;

	    private String gender;

	    private String disease;
	    
	    private Long phone;
	    
	    private String address;
	    
	    private	String bloodGroup;
	    
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


	    public int getAge() {
	        return age;
	    }

	    public void setAge(int age) {
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

		