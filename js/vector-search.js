(function () {
  function postVectorSearch(question, planId, topK) {
    return fetch('/api/vector-search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: String(question || '').trim(),
        planId: planId || null,
        topK: topK || 5
      })
    }).then(function (res) {
      if (!res.ok) {
        return res.json().catch(function () {
          return {};
        }).then(function (payload) {
          throw new Error(payload.error || 'Vector search failed (' + res.status + ')');
        });
      }
      return res.json();
    });
  }

  function searchPlanChunks(question, options) {
    var opts = options || {};
    var planId = opts.planId || null;
    var topK = opts.topK || 5;
    return postVectorSearch(question, planId, topK).then(function (payload) {
      var rows = Array.isArray(payload.chunks) ? payload.chunks : [];
      return rows.map(function (row) {
        return {
          id: row.id,
          planId: row.plan_id || '',
          planName: row.plan_name || '',
          text: row.chunk_text || '',
          chunkIndex: row.chunk_index,
          pageNumber: row.page_number,
          sourcePdf: row.source_pdf || '',
          similarity: row.similarity
        };
      });
    });
  }

  window.CHA_VECTOR_SEARCH = {
    searchPlanChunks: searchPlanChunks
  };
})();
