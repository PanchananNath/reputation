"use client";
import { useState } from 'react';

 const SubscriberReviewForm = (props: {
    params: { vnf: string, userid: string };
}) => {
    const [formData, setFormData] = useState({
        vnfid: '',
        userid: '',
        bandwidthmatched: '',
        throughput: '',
        latency: '',
        score: ''
    });

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        try {
            const body = {
                vnfid: props.params.vnf,
                userid: props.params.userid,
                bandwidthmatched: formData.bandwidthmatched,
                throughput: formData.throughput,
                latency: formData.latency,
                score: formData.score
            };
            const response = await fetch('/api/addsubscriberreview', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                throw new Error('Failed to submit review');
            }

            const responseData = await response.json();
            alert(responseData.message);
            // Optionally, you can redirect the user to another page here
        } catch (error) {
            console.error(error);
            alert('An error occurred while submitting the review');
        }
    };

    return (
        <div>
            <h1>Subscriber Review Form</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="bandwidthmatched">Bandwidth Matched:</label>
                <select id="bandwidthmatched" name="bandwidthmatched" value={formData.bandwidthmatched} onChange={handleChange} required>
    <option value="">Select</option>
    <option value="true">True</option>
    <option value="false">False</option>
</select><br /><br />

                <label htmlFor="throughput">Throughput:</label>
                <input type="text" id="throughput" name="throughput" value={formData.throughput} onChange={handleChange} required /><br /><br />

                <label htmlFor="latency">Latency:</label>
                <input type="text" id="latency" name="latency" value={formData.latency} onChange={handleChange} required /><br /><br />

                <label htmlFor="score">Score:</label>
                <input type="number" id="score" name="score" value={formData.score} onChange={handleChange} required /><br /><br />

                <button type="submit">Submit Review</button>
            </form>
        </div>
    );
}
export default SubscriberReviewForm;