import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as _ from 'lodash'
import {zhSort} from '../util/zh_sort'

class Cascader extends Component {

    static propTypes = {
        selectedPro: PropTypes.string,
        selectedCityName: PropTypes.string,
        schools: PropTypes.array,
        selectedSchool: PropTypes.string,
        schoolGroupBy: PropTypes.array,
        currentCity: PropTypes.array,
        currentSchools: PropTypes.array,
        setSchool: PropTypes.func,
        selectedCountyName: PropTypes.string,
        currentCounties: PropTypes.array
    }

    constructor(props) {
        super(props);
        this.state = {
            selectedPro: '',
            selectedCityName: '',
            schools: props.schools,
            selectedSchool: '',
            schoolGroupBy: [],
            currentCity: [],
            currentSchools: [],
            setSchool: props.setSchool,
            selectedCountyName: '',
            currentCounties: []
        }

        this.handleSelectCity = this.handleSelectCity.bind(this)
        this.handleSetSchool = this.handleSetSchool.bind(this)
        this.showCity = this.showCity.bind(this)
        this.handleSelectCounty = this.handleSelectCounty.bind(this)
    }

    componentDidMount() {
        let {schools} = this.state
        var provinceKey = _.groupBy(schools, item => item.province)
        const groupBy = (result) => {
            let proResult = []
            Object.keys(result).map(item => {
                let proObj = {}
                proObj.province = item
                proObj.city = _.groupBy(result[item], item => item.city)
                proResult.push(proObj)
            })
            return proResult
        }
        this.setState({schoolGroupBy: groupBy(provinceKey)})
    }

    handleSelectCity = async (cityName, currentCity) => {
        let currentSchool = zhSort(currentCity[cityName])
        let counties = _.uniq(_.map(currentCity[cityName], 'countyName'))
        this.setState({
            selectedCityName: cityName,
            selectedCountyName: counties[0],
            currentSchools: currentSchool,
            selectedSchool: currentSchool[0],
            currentCounties: counties
        })
    }

    handleSetSchool = async (school) => {
        this.props.onSchoolSelected(school)
        this.setState({selectedSchool: school})
    }

    showCity = (province, city, school) => {
        let county = city[`${Object.keys(school.city)[0]}`][0].countyName
        let cityName = Object.keys(city)[0];
        this.setState({
            currentCity: city,
            selectedCityName: cityName,
            selectedPro: province,
            selectedCountyName: county,
            currentSchools: school.city[`${Object.keys(school.city)[0]}`],
            selectedSchool: school.city[`${Object.keys(school.city)[0]}`][0],
            currentCounties: _.uniq(_.map(city[`${Object.keys(school.city)[0]}`], 'countyName'))
        })
        this.props.onSchoolSelected(school.city[`${Object.keys(school.city)[0]}`][0])
    }

    handleSelectCounty = async (schools, countyName) => {
        let currentS = zhSort(schools.filter(item => item.countyName === countyName))
        this.setState({
            currentSchools: currentS,
            selectedCountyName: countyName,
            selectedSchool: currentS[0],
        })
        this.props.onSchoolSelected(currentS[0])
    }

    render() {
        let {selectedPro, selectedCityName, selectedSchool, schoolGroupBy, currentCity, currentSchools, selectedCountyName, currentCounties} = this.state
        let cityLists = [],  countyListOptions = []
        let schoolOptions = schoolGroupBy && schoolGroupBy.map(school => {
                return <div key={school.province} style={{
                    padding: '5px 10px',
                    borderTop: '1px solid #eee',
                    borderBottom: '1px solid #eee',
                    cursor: 'pointer',
                    backgroundColor: selectedPro === school.province ? 'yellow' : '#FFFFFF'
                }} onClick={() => this.showCity(school.province, school.city, school)}>
                    {school.province}
                </div>
            })

        Object.keys(currentCity).map((c, index) => {
            cityLists.push(
                <div key={`${index}_${c}`} style={{
                    cursor: 'pointer',
                    padding: '5px 10px',
                    borderTop: '1px solid #eee',
                    borderBottom: '1px solid #eee',
                    backgroundColor: selectedCityName === c ? 'yellow' : '#FFFFFF'
                }} onClick={() => this.handleSelectCity(c, currentCity)}>
                    {c}
                </div>
            )
            currentCounties.map( (county, index) => {
                if(!county) return
                countyListOptions.push(
                    <div key={`${index}_${county}`} style={{
                        cursor: 'pointer',
                        padding: '5px 10px',
                        borderTop: '1px solid #eee',
                        borderBottom: '1px solid #eee',
                        backgroundColor: selectedCountyName === county ? 'yellow' : '#FFFFFF'
                    }}
                    onClick={() => this.handleSelectCounty(currentCity[selectedCityName], county)}>
                    {county}
                </div>)
            })
        })

        let schoolsOptions = currentSchools && currentSchools.map(school => {
                return (
                    <div key={school.id} style={{
                        cursor: 'pointer',
                        padding: '5px 10px',
                        borderTop: '1px solid #eee',
                        borderBottom: '1px solid #eee',
                        backgroundColor: selectedSchool.id === school.id ? 'yellow' : '#FFFFFF'
                    }} onClick={() => this.handleSetSchool(school)}>{school.name}</div>
                )
            })

        return (
            <div>
                <div style={{fontSize: '14px', padding: '10px 15px'}}>请选择你的学校</div>
                <div style={{display: 'flex', width: '100%', fontSize: '14px'}}>
                    <div style={{
                        height: '315px',
                        overflowY: 'auto',
                        order: 1,
                        width: '25%',
                        borderRight: '1px solid #eee'
                    }}>
                        {schoolOptions}
                    </div>
                    <div style={{
                        height: '315px',
                        order: 2,
                        width: '25%',
                        overflowY: 'auto',
                        borderRight: '1px solid #eee'
                    }}>
                        {cityLists.length === 0 && <div>-</div>}
                        {cityLists}
                    </div>
                    <div style={{
                        height: '315px',
                        order: 2,
                        width: '25%',
                        overflowY: 'auto',
                        borderRight: '1px solid #eee'
                    }}>
                        {countyListOptions.length === 0 && <div>-</div>}
                        {countyListOptions}
                    </div>
                    <div style={{height: '315px', order: 3, width: '50%', overflowY: 'auto'}}>
                        {schoolsOptions.length === 0 && <div>请选择左边的省/城市</div>}
                        {schoolsOptions}
                    </div>
                </div>
            </div>
        )
    }
}

export default Cascader