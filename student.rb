class Student
  attr_reader :id, :age, :name, :github
  
  def initialize(options)
    @id = options["id"]
    @name = options["name"]
    @age = options["age"]
    @github = options["github"]
  end
  
  def can_drink?
    age >= 200
  end
  
  def ultra_wise?
    age >= 1000
  end
  
  def github_link
    "http://github.com/#{github}"
  end
  
  # Public: Get a list of all students from the database.
  #
  # Returns an Array of Student objects.
  def self.all
    results = DATABASE.execute("SELECT * FROM students")
    
    results.map { |row_hash| self.new(row_hash) }
  end
  
  # Public: Get a single student from the database.
  #
  # s_id - Integer
  #
  # Returns a Student object.
  def self.find(s_id)
    result = DATABASE.execute("SELECT * FROM students WHERE id = #{s_id}")[0]
    
    self.new(result)
  end
  
  # Returns the object as a Hash.
  def to_hash
    {
      id: id,
      name: name,
      age: age,
      github: github
    }
  end
  
  def edit(params)
    params.each do |field, value|
      thaw_field = field.dup.insert(0, "@")
      self.instance_variable_set(thaw_field, value) if value != ""
    end
    self
  end
  
  def insert
    DATABASE.execute("INSERT INTO students (name, age, github) VALUES 
    ('#{@name}', #{@age}, '#{@github}')")
    @id =  DATABASE.last_insert_row_id
  end
  
  def delete
    DATABASE.execute("DELETE FROM students WHERE id = #{@id}")
  end
  
  def save
    attributes = []

    # Example  [:@serial_number, :@name, :@description]
    instance_variables.each do |i|
      # Example  :@name
      attributes << i.to_s.delete("@") # "name"
    end
  
    query_hash = {}

    attributes.each do |a|
      value = self.send(a)
      query_hash[a] = value
    end
    
    query_hash.each do |key, value|
      DATABASE.execute("UPDATE students SET #{key} = ? WHERE id = #{id}", value )
    end
    self
  end
end