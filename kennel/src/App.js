import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HandlerVetOICLogin from './Components/HandlerVetOICLogin';

import DirectorRegister from './Pages/DirectorRegister';
import DirectorLogin from './Pages/DirectorLogin';


import DogAccountCreate from './Pages/DogAccountCreate';
import DogProfile from './Pages/DogProfile';
import AddDutyInfo from './Pages/AddDutyInfo';
import AddTrainingInfo from './Pages/AddTrainingInfo';
import AddBreedingInfo from './Pages/AddBreedingInfo';
import DeputyVetSearchDogs from './Pages/DeputyVetSearchDogs';
import DeputyVetSearchedDogProfile from './Pages/DeputyVetSearchedDogProfile';
import AddHealthInfo from './Pages/AddHealthInfo';
import AddVaccinationInfo from './Pages/AddVaccinationInfo';

import AddDeathInfo from './Pages/AddDeathInfo';
import OicDashboard from './Pages/OicDashboard';
import DirectorDashboard from './Pages/DirectorDashboard';
import DirectorSearchingDogProfiles from './Pages/DirectorSearchingDogProfiles';
import DirectorCredentialManagesButtons from './Pages/DirectorCredentialsManageButtons';
import HandlerCredentialsTable from './Pages/HandlerCredentialsTable';
import DeputyVetCredentialsTable from './Pages/DeputyVetCredentialsTable';
import OicCredentialsTable from './Pages/OicCredentialsTable';
import DirectorCredentialsTable from './Pages/DirectorCredentialsTable';
import OicGenerateDailyReport from './Pages/OicGenerateDailyReport';
import OicGenerateSummary from './Pages/OicGenerateSummary';
import { UserProvider } from './UserContext';




//app routes paths 

const App = () => {
    const [sickType] = useState(''); // Initialize with an empty string or default value
    return (

        <UserProvider>

            <Router>
                <Routes>
                    {/*call Welcome page in App.js as a component*/}
                    <Route path="/" element={<DirectorLogin />} />
                    {/* <Route path="/" element={<WelcomePage />} /> */}




                    <Route path="/Pages/DirectorDashboard" element={<DirectorDashboard />} />
                    <Route path="/Pages/HandlerLogin" element={<HandlerVetOICLogin name={"Handler Login"} />} />
                    <Route path="/Pages/DeputyVetLogin" element={<HandlerVetOICLogin name={"Deputy Veterinary Login"} />} />
                    <Route path="/Pages/OICLogin" element={<HandlerVetOICLogin name={"OIC Login"} />} />
                    <Route path="/Pages/DirectorRegister" element={<DirectorRegister />} />
                    <Route path="/Pages/DirectorLogin" element={<DirectorLogin />} />



                    <Route path="/Pages/DogAccountCreate" element={<DogAccountCreate />} />

                    <Route path="/Pages/DogProfile" element={<DogProfile />} />
                    <Route path="/Pages/AddDutyInfo" element={<AddDutyInfo />} />
                    <Route path="/Pages/AddTrainingInfo" element={<AddTrainingInfo />} />
                    <Route path="/Pages/AddBreedingInfo" element={<AddBreedingInfo />} />

                    <Route path="/Pages/DeputyVetSearchDogs" element={<DeputyVetSearchDogs />} />
                    <Route path="/Pages/DeputyVetSearchedDogProfile" element={<DeputyVetSearchedDogProfile />} />
                    <Route path="/Pages/AddHealthInfo" element={<AddHealthInfo />} />
                    <Route path="/Pages/AddVaccinationInfo" element={<AddVaccinationInfo />} />
                    <Route path="/Pages/AddDeathInfo" element={<AddDeathInfo />} />
                    <Route path="/Pages/OicDashboard" element={<OicDashboard />} />
                    <Route path="/Pages/OicGenerateDailyReport" element={<OicGenerateDailyReport />} />
                    <Route path="/Pages/OicGenerateSummary" element={<OicGenerateSummary />} />
                    <Route path="/Pages/DirectorDashboard" element={<DirectorDashboard />} />
                    <Route path="/Pages/DirectorSearchingDogProfiles" element={<DirectorSearchingDogProfiles />} />

                    <Route path="/Pages/DirectorCredentialsManageButtons" element={<DirectorCredentialManagesButtons />} />
                    <Route path="/Pages/HandlerCredentialsTable" element={<HandlerCredentialsTable />} />
                    <Route path="/Pages/DeputyVetCredentialsTable" element={<DeputyVetCredentialsTable />} />
                    <Route path="/Pages/OicCredentialsTable" element={<OicCredentialsTable />} />
                    <Route path="/Pages/DirectorCredentialsTable" element={<DirectorCredentialsTable />} />
                    <Route path="/Pages/OicGenerateDailyReport" element={<OicGenerateDailyReport />} />




                </Routes>
            </Router>
        </UserProvider>


    );
};

export default App;
