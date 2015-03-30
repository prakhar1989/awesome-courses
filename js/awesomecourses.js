var Form = React.createClass({
  getNewCourse: function() {
    return {
      title: "",
      link: "",
      code: "",
      university: "",
      category: "",
      readings: "",
      assignments: "",
      notes: "",
      videos: ""
    }
  },
  getInitialState: function() {
    var data = localStorage.getItem('courses');
    var courses = data === null ? [] : JSON.parse(data);
    return {
      courses: courses,
      course: this.getNewCourse()
    }
  },
  clearData: function(e) {
    e.preventDefault();
    localStorage.setItem('courses', JSON.stringify([]));
    this.setState({
      courses: []
    });
  },
  handleSubmit: function(event) { 
    event.preventDefault();

    var id = this.state.courses.length + 1,
        course = this.state.course;

    var course = {
      id: id,
      title: course.title,
      code: course.code,
      link: course.link,
      description: course.description,
      university: course.university,
      category: course.category,
      assignments: course.assignments || null,
      readings: course.readings || null,
      videos: course.videos || null,
      notes: course.notes || null
    }

    // add new course and set to blank
    var courses = this.state.courses.concat(course);
    this.setState({
      courses: courses,
      course: this.getNewCourse()
    });

    localStorage.setItem('courses', JSON.stringify(courses));

    // <hack> page reload </hack>
    setTimeout(function() { location.reload() }, 500);
  },
  handleChange: function(key, event) {
    var state = this.state.course;
    state[key] = event.target.value;
    this.setState(state);
  },
  render: function() {
    var courses = JSON.stringify(this.state.courses, null, 2);
    var course = this.state.course;
    return (
      <div>
        <pre><code>{JSON.stringify(course, null, 2)}</code></pre>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="six columns">
              <p> <input type="text" className="u-full-width" placeholder="code" defaultValue={course.code} onChange={this.handleChange.bind(this, 'code')} /> </p>
              <p> <input type="text" className="u-full-width" placeholder="title" defaultValue={course.title} onChange={this.handleChange.bind(this, 'title')} /> </p>
              <p> <input type="text" className="u-full-width" placeholder="university" defaultValue={course.university} onChange={this.handleChange.bind(this, 'university')}/> </p>
              <p> <input type="text" className="u-full-width" placeholder="link" defaultValue={course.link} onChange={this.handleChange.bind(this, 'link')}/> </p>
              <p> <input type="text" className="u-full-width" placeholder="category" defaultValue={course.category} onChange={this.handleChange.bind(this, 'category')} /> </p>
            </div>
            <div className="six columns">
              <p> <input type="text" className="u-full-width" placeholder="assignments" defaultValue={course.assignments} onChange={this.handleChange.bind(this, 'assignments')} /> </p>
              <p> <input type="text" className="u-full-width" placeholder="readings" defaultValue={course.readings} onChange={this.handleChange.bind(this, 'readings')} /> </p>
              <p> <input type="text" className="u-full-width" placeholder="notes" defaultValue={course.notes} onChange={this.handleChange.bind(this, 'notes')} /> </p>
              <p> <input type="text" className="u-full-width" placeholder="videos" defaultValue={course.videos} onChange={this.handleChange.bind(this, 'videos')} /> </p>
              <p> <textarea className="u-full-width" placeholder="description" defaultValue={course.description} onChange={this.handleChange.bind(this, 'description')} ></textarea> </p>
            </div>
          </div>
          <input type="submit" className="button button-primary" value="Add Course" />
          <button className="button" onClick={this.clearData}>Clear data</button>
        </form>
        <pre>
          <code>{courses}</code>
        </pre>
      </div>
    )
  }
});

React.render(<Form />, document.getElementById('app'));
